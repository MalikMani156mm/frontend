import express from 'express';
import {
    getAllFIRs,
    getFIRById,
    createNewFIR,
    updateFIR,
    deleteFIR
} from "../controllers/FIRcontroller.js";
import { isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()


router.route('/FIRs').get(getAllFIRs);
router.route('/FIR/:id').get(isAuthorizedUser,getFIRById);
router.route('/new/FIR').post(createNewFIR);
router.route('/update/:id').put(isAuthorizedUser,updateFIR);
router.route('/delete/:id').delete(isAuthorizedUser,deleteFIR);

export default router;