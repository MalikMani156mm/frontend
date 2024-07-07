import express from 'express';
import { RegisterNewUser, LoginUser, LogoutUser, ConfirmPassword, ChangePassword, ChangeUsername, getUserForSidebar } from '../controllers/AuthController.js';
import { isAuthenticatedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/auth/register').post(RegisterNewUser);
router.route('/auth/login').post(LoginUser);
router.route('/auth/logout').post(LogoutUser);
router.route('/auth/users').get(isAuthenticatedUser, getUserForSidebar);
router.route('/auth/confirmPassword').post(ConfirmPassword);
router.route('/auth/changePassword/:id').post(ChangePassword);
router.route('/auth/changeUsername/:id').post(ChangeUsername);



export default router;