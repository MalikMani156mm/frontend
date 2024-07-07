import express from 'express';
import { sendMessage,getMessages } from '../controllers/messageControllers.js';
import { isAuthenticatedUser } from '../middleware/authMiddleware.js';
const router = express.Router()

router.route('/message/get/:id').get(isAuthenticatedUser, getMessages);
router.route('/message/send/:id').post(isAuthenticatedUser, sendMessage);

export default router;
