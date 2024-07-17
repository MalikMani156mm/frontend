import mongoose from "mongoose";
const { Schema } = mongoose;

const ContactMessageSchema = new Schema(
    { 
        name: {
            type: String,
            require:[true, 'Please provide the Name'],
            min:[3, 'At least of 3 words'],
            max:[30, 'Maximum limit of 30 words']
        },
        email: {
            type: String,
            require:[true, 'Please provide the Email'],
        },
        message:{
            type: String,
            require: [true, 'Please provide the message']
        }
    }
)
const ContactMessage = mongoose.model( 'ContactMessage', ContactMessageSchema );
export default ContactMessage;