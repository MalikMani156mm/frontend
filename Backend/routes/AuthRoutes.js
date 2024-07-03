import express from 'express';
import { RegisterNewUser, LoginUser, LogoutUser, ConfirmPassword } from '../controllers/AuthController.js';
const router = express.Router()


router.route('/auth/register').post(RegisterNewUser);
router.route('/auth/login').post(LoginUser);
router.route('/auth/logout').post(LogoutUser);
router.route('/auth/confirmPassword').post(ConfirmPassword);



export default router;