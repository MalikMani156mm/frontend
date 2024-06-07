import express from 'express';
import {
    getAllFIRs,
    getFIRById,
    createNewFIR,
    updateFIR,
    deleteFIR
} from "../controllers/FIRcontroller.js";
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/FIRs').get(isAuthenticatedUser , getAllFIRs);
router.route('/FIR/:id').get(isAuthenticatedUser,getFIRById);
router.route('/new/FIR').post(createNewFIR);
router.route('/update/:id').put(isAuthenticatedUser, isAuthorizedUser ('Citizen'),updateFIR);
router.route('/delete/:id').delete(isAuthenticatedUser,isAuthorizedUser ('Admin', 'Citizen') , deleteFIR);

export default router;