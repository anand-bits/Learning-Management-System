import { Router } from "express";
import { createCourse, getAllCourses, getLectureByCourseId, removeCourse, updateCourse } from "../controller/course.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

// Routes for handling courses
router.route('/')
  .get(getAllCourses)
  .post(isLoggedIn,upload.single('thumbnail'), createCourse);

// Route for updating a course
router.route('/:id')
  .put(isLoggedIn,updateCourse);

// Route for deleting a course
router.route('/:id')
  .delete(isLoggedIn,removeCourse);

// Route for getting lectures of a course
router.route('/:id/lectures')
  .get(isLoggedIn, getLectureByCourseId);

export default router;
