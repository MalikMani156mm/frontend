import express from 'express';
import { 
    getCertificateById,
    createNewCertificate,
    updateCertificate,
    deleteCertificate, 
    getCitizenCertificates,
    getPoliceStationCertificates,
    changeCertificateStatus,
    changeCertificatePoliceStation
} from '../controllers/CCcontroller.js';
import { isAuthenticatedUser, isAuthorizedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/CitizenCertificates').get(getCitizenCertificates);
router.route('/PoliceStationCertificates').get(getPoliceStationCertificates);
router.route('/updateCertificateStatus/:id').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'), changeCertificateStatus);
router.route('/updateCertificatePoliceStation/:id').post(isAuthenticatedUser,isAuthorizedUser('SuperAdmin','Admin'), changeCertificatePoliceStation);
router.route('/Certificate/:id').get(getCertificateById);
router.route('/new/Certificate').post(createNewCertificate);
router.route('/updateCertificate/:id').put( updateCertificate);
router.route('/deleteCertificate/:id').delete( deleteCertificate);

export default router;