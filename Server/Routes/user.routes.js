
import { Router } from "express";
import { getProfile, login, logout, register } from "../controller/user.controller.js";

const router= Router();

/// Here We have defined the routes and we will write the query in the controller

router.post('/register',register)
router.post('/login',login)
router.post('/logout',logout)
router.post('/me',getProfile)





export default router;