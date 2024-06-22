import express from 'express';
import { 
    getAllPoliceStations,
    getPoliceStationById,
    createNewPoliceStation,
    updatePoliceStation,
    deletePoliceStation
} from '../controllers/PoliceStationControllers.js';
// import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/PoliceStations').get(getAllPoliceStations);
router.route('/PoliceStation/:id').get(getPoliceStationById);
router.route('/new/PoliceStation').post(createNewPoliceStation);
router.route('/updatePoliceStation/:id').put( updatePoliceStation);
router.route('/deletePoliceStation/:id').delete( deletePoliceStation);

export default router;