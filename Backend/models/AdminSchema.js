import mongoose from "mongoose";
const { Schema } = mongoose;



const AdminSchema = new Schema(
    { 
        name: {
            type: String,
            require:[true, 'Please provide the Name'],
            min:[3, 'At least of 3 words'],
            max:[30, 'Maximum limit of 30 words'],
            unique:true
        },
        PoliceStation: {
            type:Schema.Types.ObjectId,
            ref:'PoliceStation',
            require: [true, 'Please provide the Police Station'],
            unique:true
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
        },
        resetToken:{
            type:String,
            default:'',
        }
    },
    {
        timestamps:true
    }
)
const Admin = mongoose.model( 'Admin', AdminSchema );
export default Admin;