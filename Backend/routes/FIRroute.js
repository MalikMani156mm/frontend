import express from 'express';
import {
    getAllFIRs,
    getCitizenFIRs,
    getPoliceStationFIRs,
    searchFIRs,
    getFIRById,
    createNewFIR,
    updateFIR,
    deleteFIR
} from "../controllers/FIRcontroller.js";
// import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/FIRs').get(getAllFIRs);
router.route('/CitizenFIRs').get(getCitizenFIRs);
router.route('/PoliceStationFIRs').get(getPoliceStationFIRs);
router.route('/SearchFIRs').get(searchFIRs);
router.route('/FIR/:id').get(getFIRById);
router.route('/new/FIR').post(createNewFIR);
router.route('/update/:id').put( updateFIR);
router.route('/delete/:id').delete( deleteFIR);

export default router;