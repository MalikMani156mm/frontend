import express from 'express';
import { RegisterNewAdmin, LoginAdmin, LogoutAdmin,ChangeAdminPassword,ConfirmAdminPassword, ForgetPasswordEmailConfirmation, ResetAdminPassword, ChangeAdminName} from '../controllers/AdminControllers.js';
const router = express.Router()


router.route('/adminAuth/register').post(RegisterNewAdmin);
router.route('/adminAuth/login').post(LoginAdmin);
router.route('/adminAuth/logout').post(LogoutAdmin);
router.route('/auth/confirmAdminPassword').post(ConfirmAdminPassword);
router.route('/auth/changeAdminPassword/:id').post(ChangeAdminPassword);
router.route('/auth/AdminForgetPassword').post(ForgetPasswordEmailConfirmation);
router.route('/auth/AdminForgetPassword').post(ForgetPasswordEmailConfirmation);
router.route('/auth/AdminResetPassword').post(ResetAdminPassword);
router.route('/auth/changeAdminName/:id').post(ChangeAdminName);


export default router;