import mongoose from "mongoose";
const { Schema } = mongoose;



const AdminSchema = new Schema(
    { 
        PoliceStation: {
            type:Schema.Types.ObjectId,
            ref:'PoliceStation',
            require: [true, 'Please provide the Police Station']
        },
        email: {
            type: String,
            require:[true, 'Please provide the Email'],
            unique:true
        },
        password: {
            type: String,
            require:[true, 'Please provide the Password'],
        },
        role:{
            type:String,
            default:'Admin',
            enum: ['SuperAdmin','Admin']
        }
    },
    {
        timestamps:true
    }
)
const Admin = mongoose.model( 'Admin', AdminSchema );
export default Admin;