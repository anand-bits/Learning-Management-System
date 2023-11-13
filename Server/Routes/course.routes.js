import { Router } from "express";
import { addLectureToCourseBYID, createCourse, getAllCourses, getLectureByCourseId, removeCourse, updateCourse } from "../controller/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";

const router = Router();

// Routes for handling courses
router.route('/')
  .get(getAllCourses)
  .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single('thumbnail'), createCourse);

// Route for updating a course
router.route('/:id')
  .put(isLoggedIn, authorizedRoles('ADMIN'), updateCourse)
  .delete(isLoggedIn, authorizedRoles('ADMIN'), removeCourse);

// Route for getting lectures of a course
router.route('/:id/lectures')
  .get(isLoggedIn, getLectureByCourseId)
  .post(isLoggedIn, authorizedRoles('ADMIN'), upload.single('lecture'), addLectureToCourseBYID);

export default router;
