import express from 'express';
import { 
    getAllCertificates,
    getCertificateById,
    createNewCertificate,
    updateCertificate,
    deleteCertificate 
} from '../controllers/CCcontroller.js';
// import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/Certificates').get(getAllCertificates);
router.route('/Certificate/:id').get(getCertificateById);
router.route('/new/Certificate').post(createNewCertificate);
router.route('/updateCertificate/:id').put( updateCertificate);
router.route('/deleteCertificate/:id').delete( deleteCertificate);

export default router;