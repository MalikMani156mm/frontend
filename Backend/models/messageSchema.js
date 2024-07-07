import mongoose from "mongoose";
const { Schema } = mongoose;



const messageSchema = new Schema(
    { 
        senderId: {
            type:Schema.Types.ObjectId,
            ref:'User',
            require: [true, 'Please provide the Sender Id']
        },
        recieverId: {
            type:Schema.Types.ObjectId,
            ref:'User',
            require: [true, 'Please provide the Reciever Id']
        },
        message:{
            type: String,
            require: [true, 'Please provide the message']
        }
       
    },
    {
        timestamps:true
    }
)
const Message = mongoose.model( 'Message', messageSchema );
export default Message;