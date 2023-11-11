import User from "../models/user.models.js";
import AppError from "../utils/error.utils.js";
import fs from 'fs/promises';
import cloudinary from "cloudinary";


const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    secure: true
};

const register = async (req, res, next) => {
    
    try{
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new AppError("All fields are required", 400));
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        return next(new AppError("User already exists. Please provide a different email.", 400));
    }

    const user = await User.create({
        fullName,
        email,
        password,
        avatar: {
            public_id: email,
            secure_url: "https://res.cloudinary.com",
        },
    });

    if (!user) {
        return next(new AppError("User registration failed. Please try again.", 400));
    }

   // Used Multer to convert the binary data to single data and Wiill give the path from the uploads and than it will send to cloudify to get url and that url will be used For Picture...
   if(req.file)
   {
    console.log(req.file)
    try{

        const result= await cloudinary.v2.uploader.upload(req.file.path,{
            folder:"Learning Management System",
            width:250,
            height:250,
            gravity:"faces",
            crop:"fill"

        });


        if(result)
        {
            user.avatar.public_id=result.public_id;
            user.avatar.secure_url=result.secure_url;

            //Remove file from Server..

            await fs.rm(`uploads/${req.file.filename}`)
        }
    }
    catch(e)
    {
            return next(new AppError(e || 'File not uploaded, please try Again',500));

    }
   }

    await user.save();
    user.password = undefined;
    const token = await user.generateJWTToken();
    res.cookie('token', token, cookieOptions);

    res.status(200).json({
        success: true,
        message: "User registered successfully",
        user,
    });
}
catch(err){
    return next(new AppError("Some Thing error in Registration"),400)
}
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new AppError("All fields are required", 400));
        }

        const user = await User.findOne({
            email,
        }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            return next(new AppError("Email or password does not match", 400));
        }

        const token = await user.generateJWTToken();
        user.password = undefined;
        console.log(token)
        res.cookie('token', token, cookieOptions);
        res.status(200).json({
            success: true,
            message: "User is logged in successfully",
        });
    } catch (err) {
        return next(new AppError("Something Error in Login", 400));
    }
};

const logout = (req, res) => {
    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"User is Logged Out Successfully"
    })


};

const getProfile =async (req, res) => {

    // We wil get req.user.id from the middleware , middleware is something where we do processing before sending the request and response..
    try{
        
    const user= await User.findById(req.user.id );
    res.status(200).json({
        success:true,
        message:'User details',
        user
    })
    }
    catch(err){
        return next(new AppError("Failed to get profile"),400)
    }

    
};

export {
    register,
    login,
    logout,
    getProfile,
};
