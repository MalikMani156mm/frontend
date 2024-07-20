import express from 'express';
import { 
    getAllOffences,
    getOffenceById,
    createNewOffence,
    updateOffence,
    deleteOffence
} from '../controllers/OffenceControllers.js';
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/Offences').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'),getAllOffences);
router.route('/Offence/:id').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin','Citizen'),getOffenceById);
router.route('/new/Offence').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),createNewOffence);
router.route('/updateOffence/:id').put( isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),updateOffence);
router.route('/deleteOffence/:id').delete( isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'),deleteOffence);

export default router;