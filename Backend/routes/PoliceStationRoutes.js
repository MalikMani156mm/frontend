import express from 'express';
import { 
    getAllPoliceStations,
    getPoliceStationById,
    createNewPoliceStation,
    updatePoliceStation,
    deletePoliceStation
} from '../controllers/PoliceStationControllers.js';
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/PoliceStations').get(getAllPoliceStations);
router.route('/PoliceStation/:id').get(getPoliceStationById);
router.route('/new/PoliceStation').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin'),createNewPoliceStation);
router.route('/updatePoliceStation/:id').put( isAuthenticatedUser,isAuthorizedUser('Admin'),updatePoliceStation);
router.route('/deletePoliceStation/:id').delete(isAuthenticatedUser,isAuthorizedUser('SuperAdmin'), deletePoliceStation);

export default router;