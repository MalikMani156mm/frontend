import express from 'express';
import { 
    getRequestById,
    createNewRequest,
    updateRequest,
    deleteRequest, 
    getCitizenRequests,
    getPoliceStationRequests,
    changeRequestStatus,
    updateRequestRating
    } from '../controllers/VVcontroller.js';
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/CitizenRequests').get(getCitizenRequests);
router.route('/PoliceStationRequests').get(getPoliceStationRequests);
router.route('/updateRequestRating/:id').post(isAuthenticatedUser,isAuthorizedUser('Citizen'), updateRequestRating);
router.route('/updateRequestStatus/:id').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'), changeRequestStatus);
router.route('/Request/:id').get(getRequestById);
router.route('/new/Request').post(createNewRequest);
router.route('/updateRequest/:id').put( updateRequest);
router.route('/deleteRequest/:id').delete( deleteRequest);

export default router;