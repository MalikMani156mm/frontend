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

router.route('/FIRs').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin'),getAllFIRs);
router.route('/CitizenFIRs').get(isAuthenticatedUser,isAuthorizedUser('Citizen'), getCitizenFIRs);
router.route('/PoliceStationFIRs').get(isAuthenticatedUser,isAuthorizedUser('Admin'),getPoliceStationFIRs);
router.route('/SearchFIRs').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),searchFIRs);
router.route('/FIRs/count').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin'),getAllFIRCount);
router.route('/PoliceStationFIRs/count').get(isAuthenticatedUser,isAuthorizedUser('Admin'),getPoliceStationFIRCount);
router.route('/CitizenFIRs/count').get(isAuthenticatedUser,isAuthorizedUser('Citizen'),getCitizenFIRCount);
router.route('/updateStatus/:id').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'), changeFIRStatus);
router.route('/updateRating/:id').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'), updateFIRRating);
router.route('/updatePoliceStation/:id').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'), changeFIRPoliceStation);
router.route('/FIR/:id').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'),getFIRById);
router.route('/new/FIR').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'),createNewFIR);
router.route('/update/:id').put(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'), updateFIR);
router.route('/delete/:id').delete(isAuthenticatedUser,isAuthorizedUser('Citizen'), deleteFIR);

export default router;