import express from 'express';
import { RegisterNewUser, LoginUser, LogoutUser } from '../controllers/AuthController.js';
const router = express.Router()


router.route('/auth/register').post(RegisterNewUser);
router.route('/auth/login').post(LoginUser);
router.route('/auth/logout').post(LogoutUser);


export default router;