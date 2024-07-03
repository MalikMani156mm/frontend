import express from 'express';
import { 
    getAllOffences,
    getOffenceById,
    createNewOffence,
    updateOffence,
    deleteOffence
} from '../controllers/OffenceControllers.js';
// import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/Offences').get(getAllOffences);
router.route('/Offence/:id').get(getOffenceById);
router.route('/new/Offence').post(createNewOffence);
router.route('/updateOffence/:id').put( updateOffence);
router.route('/deleteOffence/:id').delete( deleteOffence);

export default router;