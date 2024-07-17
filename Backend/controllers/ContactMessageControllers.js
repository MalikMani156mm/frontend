import ContactMessage from "../models/ContactMessageSchema.js";

export const getAllContactMessage = async function (req, res, next) {
    try {
        const messages = await ContactMessage.find({});
        res.json(messages);
    } catch (error) {
        next(error)
    }

}

export const createNewContactMessage = async function (req, res, next) {
    const newContactMessage = req.body;

    try {
        const resp = await ContactMessage.create(newContactMessage);
        res.json({
            ContactMessage: resp,
            message: "Your Message is send Successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}