import express from 'express';
import { RegisterNewAdmin, LoginAdmin, LogoutAdmin,ChangeAdminPassword,ConfirmAdminPassword, ForgetPasswordEmailConfirmation, ResetAdminPassword, ChangeAdminName} from '../controllers/AdminControllers.js';
import { isAuthenticatedUser,isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/adminAuth/register').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin'),RegisterNewAdmin);
router.route('/adminAuth/login').post(LoginAdmin);
router.route('/adminAuth/logout').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),LogoutAdmin);
router.route('/auth/confirmAdminPassword').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),ConfirmAdminPassword);
router.route('/auth/changeAdminPassword/:id').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),ChangeAdminPassword);
router.route('/auth/AdminForgetPassword').post(ForgetPasswordEmailConfirmation);
router.route('/auth/AdminForgetPassword').post(ForgetPasswordEmailConfirmation);
router.route('/auth/AdminResetPassword').post(ResetAdminPassword);
router.route('/auth/changeAdminName/:id').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),ChangeAdminName);


export default router;