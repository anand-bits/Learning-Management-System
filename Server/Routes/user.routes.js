
import { Router } from "express";
import { forgotPassword, getProfile, login, logout, register, resetPassword } from "../controller/user.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";


const router= Router();

/// Here We have defined the routes and we will write the query in the controller

router.post('/register',upload.single("avatar"),register)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',isLoggedIn,getProfile)
router.post('/forgot/password/reset',forgotPassword)
router.post('/reset-password/user/res',resetPassword)







export default router;