import courseModel from "../models/course.model.js";
import AppError from "../utils/error.utils.js";
import fs from "fs/promises"
import cloudinary from "cloudinary"

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.find({}).select('-lectures');
    res.status(200).json({
      success: true,
      message: 'All Courses',
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message,
    });
  }
};
const getLectureByCourseId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cleanedId = id.trim(); // Trim any leading or trailing whitespace
        const course = await courseModel.findById(cleanedId).select('lectures');

        res.status(200).json({
            success: true,
            message: 'Lectures for the course',
            lectures: course.lectures,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching lectures for the course',
            error: error.message,
        });
    }
};


const createCourse=async (req,res,next)=>
{

    const {title,description,category,createdBy}= req.body

    if(!title ||  !description || !category || !createdBy)
    {
        return next(new AppError("All fields arre required"),400);

    } 
    try{
    const course=await courseModel.create({
        title,
        description,
        category,createdBy,
        thumbnail:{
            public_id:'dummy',
            secure_url:'dummy'
        }


    });

    if(!course)
    {
        return next(new AppError("Course Dont created"),500);

    }

    if(req.file)
    {
        const result= await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'Learning Management System'
        });
        console.log(JSON.stringify(result))

        if(result)
        {
            course.thumbnail.public_id=result.public_id;
            course.thumbnail.secure_url=result.secure_url;

        }
        fs.rm(`uploads/${req.file.filename}`);

    }
    
await course.save();
res.status(200).json({
    success:true,
    message:"Course is Created",
    course
})
   
}
catch(e)
{  
     return next(new AppError(e.message,500));

}

}
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cleanedId = id.trim(); // Trim any leading or trailing whitespace
        const course = await courseModel.findByIdAndUpdate(
            cleanedId,
            {
                $set: req.body
            },
            {
                runValidators: true
            }
        );

        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Course is updated",
            course
        });
    } catch (e) {
        return next(new AppError(e.message, 500));
    }
};

const removeCourse = async (req, res, next) => {
    try {
      const { id } = req.params;
      const cleanedId = id.trim();
  
      const course = await courseModel.findById(cleanedId);
      if (!course) {
        return next(new AppError("Course doesn't exist with this id", 404));
      }
  
      // Use deleteOne to remove the document
      await courseModel.deleteOne({ _id: cleanedId });
  
      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        id: cleanedId,
      });
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  };

  const addLectureToCourseBYID = async (req, res, next) => {
    try {
      const { title, description } = req.body;
      const { id } = req.params;
  
      if (!title || !description) {
        return next(new AppError("All fields are required"), 400);
      }
  
      const cleanedId = id.trim();
      const course = await courseModel.findById(cleanedId);
  
      if (!course) {
        return next(new AppError("Course with given ID doesn't exist", 404));
      }
  
      const lectureData = {
        title,
        description,
        lecture: {
          public_id: "", // Initialize with an empty string
          secure_url: "", // Initialize with an empty string
        },
      };
  
      if (req.file) {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: 'Learning Management System',
        });
        console.log(JSON.stringify(result));
  
        // If success
        if (result) {
          // Set the public_id and secure_url in the lecture object
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        }
  
        // After successful upload remove the file from local storage
        fs.rm(`uploads/${req.file.filename}`);
      }
  
      course.lectures.push(lectureData);
      course.numberOfLectures = course.lectures.length;
  
      await course.save();
  
      res.status(200).json({
        status: true,
        message: "Lecture created",
        course,
      });
    } 
    catch (error) {
      next(new AppError(error.message, 500));
    }
  };
  

export {
  getAllCourses,
  getLectureByCourseId,
  createCourse,updateCourse,removeCourse,addLectureToCourseBYID
};
