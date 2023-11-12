import courseModel from "../models/course.model.js";

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
    // Add your code to get lecture by course ID here

    // Example:
    // const courseId = req.params.courseId;
    // const lectures = await courseModel.findById(courseId).select('lectures');

    // res.status(200).json({
    //   success: true,
    //   message: 'Lectures for the course',
    //   lectures,
    // });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lectures for the course',
      error: error.message,
    });
  }
};

export {
  getAllCourses,
  getLectureByCourseId
};
