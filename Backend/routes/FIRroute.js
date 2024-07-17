import express from 'express';
import {
    getAllFIRs,
    getCitizenFIRs,
    getPoliceStationFIRs,
    searchFIRs,
    getFIRById,
    createNewFIR,
    updateFIR,
    deleteFIR,
    getAllFIRCount,
    getPoliceStationFIRCount,
    getCitizenFIRCount,
    changeFIRStatus,
    updateFIRRating,
    changeFIRPoliceStation
} from "../controllers/FIRcontroller.js";
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/FIRs').get(getAllFIRs);
router.route('/CitizenFIRs').get(isAuthenticatedUser, getCitizenFIRs);
router.route('/PoliceStationFIRs').get(getPoliceStationFIRs);
router.route('/SearchFIRs').get(searchFIRs);
router.route('/FIRs/count').get(getAllFIRCount);
router.route('/PoliceStationFIRs/count').get(getPoliceStationFIRCount);
router.route('/CitizenFIRs/count').get(getCitizenFIRCount);
router.route('/updateStatus/:id').post( changeFIRStatus);
router.route('/updateRating/:id').post( updateFIRRating);
router.route('/updatePoliceStation/:id').post( changeFIRPoliceStation);
router.route('/FIR/:id').get(getFIRById);
router.route('/new/FIR').post(createNewFIR);
router.route('/update/:id').put( updateFIR);
router.route('/delete/:id').delete( deleteFIR);

export default router;