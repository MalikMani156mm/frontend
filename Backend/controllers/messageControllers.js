import Conversation from "../models/conversationSchema.js";
import Message from "../models/messageSchema.js";
import { getRecieverSocketId } from "../socket/socket.js";
import { io } from '../socket/socket.js';
import FIR from "../models/FIRSchema.js";
import VV from "../models/VVSchema.js";
import CC from "../models/CCSchema.js";
import User from "../models/UserSchema.js";
import { MessagesHtmlTemplate, sendMessageHtmlTemplate } from "../Utils/htmlTemplate.js";
import { sendMail } from "../middleware/sendEmail.js";

export const sendMessage = async function (req, res, next) {
    try {
        const { message } = req.body;
        const { id: recieverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }


        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);

        if (req.user.role !== "Citizen") {
            const reciever = await User.findOne({ _id: recieverId })
            const htmlTemplate = MessagesHtmlTemplate(reciever.name, message, req.user.name)
            sendMail(reciever.email, `New Message from ${req.user.name}`, "", htmlTemplate)
        }

        //Socket IO here
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.json({ newMessage });
    } catch (error) {
        next(error);
    }
}

export const sendMeetingNotification = async function (req, res, next) {

    try {

        const { message } = req.body;
        const { id } = req.params;
        const senderId = req.user._id;
        
        const validFIR = await FIR.findOne({ _id: id });

        if (!validFIR) {
            return res.json({
                message: 'FIR not found',
                success: false
            });
        }

        const reciever = await User.findOne({ cnic: validFIR.CNIC })

        if (!reciever) {
            return res.json({
                message: 'Reciever not found',
                success: false
            });
        }

        const recieverId = reciever._id;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        const htmlTemplate = sendMessageHtmlTemplate(reciever.name, validFIR.ComplaintNumber, message, req.user.name)
        sendMail(reciever.email, `Meeting Notification from ${req.user.name}`, "", htmlTemplate)

        //Socket IO here
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.json({
            newMessage,
            message: 'Meeting Notification is send!!!',
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const sendCertificateMeetingNotification = async function (req, res, next) {

    try {

        const { message } = req.body;
        const { id } = req.params;
        const senderId = req.user._id;
        
        const validCertificate = await CC.findOne({ _id: id });

        if (!validCertificate) {
            return res.json({
                message: 'Certificate not found',
                success: false
            });
        }

        const reciever = await User.findOne({ cnic: validCertificate.CNIC })

        if (!reciever) {
            return res.json({
                message: 'Reciever not found',
                success: false
            });
        }

        const recieverId = reciever._id;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        const htmlTemplate = sendMessageHtmlTemplate(reciever.name, validCertificate.ApplicationtNumber, message, req.user.name)
        sendMail(reciever.email, `Meeting Notification from ${req.user.name}`, "", htmlTemplate)

        //Socket IO here
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.json({
            newMessage,
            message: 'Meeting Notification is send!!!',
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const sendRequestMeetingNotification = async function (req, res, next) {

    try {

        const { message } = req.body;
        const { id } = req.params;
        const senderId = req.user._id;

        const validRequest = await VV.findOne({ _id: id });

        if (!validRequest) {
            return res.json({
                message: 'Request not found',
                success: false
            });
        }

        const reciever = await User.findOne({ cnic: validRequest.CNIC })

        if (!reciever) {
            return res.json({
                message: 'Reciever not found',
                success: false
            });
        }

        const recieverId = reciever._id;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recieverId] }
        })

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, recieverId]
            })
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([conversation.save(), newMessage.save()]);
        const htmlTemplate = sendMessageHtmlTemplate(reciever.name, validRequest.RequestNumber, message, req.user.name)
        sendMail(reciever.email, `Meeting Notification from ${req.user.name}`, "", htmlTemplate)

        //Socket IO here
        const recieverSocketId = getRecieverSocketId(recieverId);
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }

        res.json({
            newMessage,
            message: 'Meeting Notification is send!!!',
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const getMessages = async function (req, res, next) {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if (!conversation) {
            return res.json([]);
        }

        const messages = conversation.messages;

        res.json(
            messages
        );
    } catch (error) {
        next(error);
    }
}