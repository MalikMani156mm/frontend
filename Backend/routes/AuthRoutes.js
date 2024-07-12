import express from 'express';
import { RegisterNewUser, LoginUser, LogoutUser, ConfirmPassword, ChangePassword, ChangeUsername, getUserForSidebar , ForgetPasswordCNICConfirmation, ResetPassword, VerifySignUp, SendOTPAgain} from '../controllers/AuthController.js';
import { isAuthenticatedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/auth/register').post(RegisterNewUser);
router.route('/auth/register/otp').post(VerifySignUp);
router.route('/auth/register/sendOTPagain').get(SendOTPAgain);
router.route('/auth/login').post(LoginUser);
router.route('/auth/logout').post(LogoutUser);
router.route('/auth/users').get(isAuthenticatedUser, getUserForSidebar);
router.route('/auth/forgetPasswordCNIC').post(ForgetPasswordCNICConfirmation);
router.route('/auth/resetPassword').post(ResetPassword);
router.route('/auth/confirmPassword').post(ConfirmPassword);
router.route('/auth/changePassword/:id').post(ChangePassword);
router.route('/auth/changeUsername/:id').post(ChangeUsername);



export default router;