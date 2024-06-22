import express from 'express';
import { 
    getAllRequests,
    getRequestById,
    createNewRequest,
    updateRequest,
    deleteRequest 
    } from '../controllers/VVcontroller.js';
// import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/Requests').get(getAllRequests);
router.route('/Request/:id').get(getRequestById);
router.route('/new/Request').post(createNewRequest);
router.route('/updateRequest/:id').put( updateRequest);
router.route('/deleteRequest/:id').delete( deleteRequest);

export default router;