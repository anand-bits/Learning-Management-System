import { Router } from "express";
import { getAllCourses, getLectureByCourseId } from "../controller/course.controller.js";

const router= Router();



router
  .route('/')
  .get(getAllCourses)

  router
  .route('/:id')
export default router;
