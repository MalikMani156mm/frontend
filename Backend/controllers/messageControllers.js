import Conversation from "../models/conversationSchema.js";
import Message from "../models/messageSchema.js";

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
        //Socket IO here
        await Promise.all([conversation.save(), newMessage.save()]);

        res.json({
            newMessage
        });
    } catch (error) {
        next(error);
    }
}

export const getMessages = async function (req, res, next) {
    try {
        const{id: userToChatId}= req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages");

        if(!conversation){
            return  res.json([]);
        }
        
        const messages = conversation.messages;
        
        res.json(
            messages
        );
    } catch (error) {
        next(error);
    }
}