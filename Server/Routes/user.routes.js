
import { Router } from "express";
import { getProfile, login, logout, register } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";

const router= Router();

/// Here We have defined the routes and we will write the query in the controller

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggedIn,getProfile)





export default router;