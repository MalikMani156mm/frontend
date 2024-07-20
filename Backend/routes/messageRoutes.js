import express from 'express';
import { sendMessage,getMessages, sendMeetingNotification } from '../controllers/messageControllers.js';
import { isAuthenticatedUser,isAuthorizedUser } from '../middleware/authMiddleware.js';
import { createNewContactMessage, getAllContactMessage } from '../controllers/ContactMessageControllers.js';
const router = express.Router()

router.route('/message/get/:id').get(isAuthenticatedUser, getMessages);
router.route('/message/send/:id').post(isAuthenticatedUser, sendMessage);
router.route('/meetingNotification/send/:id').post(isAuthenticatedUser, sendMeetingNotification);
router.route('/ContactMessage/send').post(createNewContactMessage);
router.route('/ContactMessage/get').get(isAuthenticatedUser,isAuthorizedUser('SuperAdmin'),getAllContactMessage);


export default router;
