import express from 'express';
import { RegisterNewAdmin, LoginAdmin, LogoutAdmin} from '../controllers/AdminControllers.js';
const router = express.Router()


router.route('/adminAuth/register').post(RegisterNewAdmin);
router.route('/adminAuth/login').post(LoginAdmin);
router.route('/adminAuth/logout').post(LogoutAdmin);


export default router;