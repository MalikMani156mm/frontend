import mongoose from "mongoose";
const { Schema } = mongoose;



const UserSchema = new Schema(
    { 
        name: {
            type: String,
            
            require:[true, 'Please provide the Name'],
            min:[5, 'At least of 5 words'],
            max:[30, 'Maximum limit of 30 words']
        },
        email: {
            type: String,
            require:[true, 'Please provide the Email'],
            // unique:true
        },
        phonenumber: {
            type: Number,
            require:[true, 'Please provide the Phone Number'],
            // min:[11, 'At least of 11 number'],
            // max:[13, 'Maximum limit of 13 number']
        },
        cnic: {
            type: Number,
            require:[true, 'Please provide the CNIC'],
            // min:[13, 'without dash 13 number'],
            // max:[15, 'with dash 15 number']
        },
        password: {
            type: String,
            require:[true, 'Please provide the Password'],
        },
        role:{
            type:String,
            default:'Citizen',
            enum: ['Citizen','Admin']
        }
    },
    {
        timestamps:true
    }
)
const User = mongoose.model( 'User', UserSchema );
export default User;