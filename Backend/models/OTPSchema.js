import mongoose, { get } from "mongoose";
const { Schema } = mongoose;



const OTPSchema = new Schema(
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
            unique:true
        },
        phonenumber: {
            type: Number,
            require:[true, 'Please provide the Phone Number'],
            unique:true,
        },
        cnic: {
            type: Number,
            require:[true, 'Please provide the CNIC'],
            unique:true,
        },
        password: {
            type: String,
            require:[true, 'Please provide the Password'],
        },
        role:{
            type:String,
            default:'Citizen',
            enum: ['Citizen','Admin']
        },
        otp:{
            type: String,
            require:[true, 'Please provide the otp'],
        },
        token:{
            type:String,
            default:'',
        },
        image:{
            type:String
        },
        otpExpiration:{
            type:Date,
            default:Date.now,
            get: (otpExpiration)=> otpExpiration.getTime(),
            set: (otpExpiration)=> new Date(otpExpiration)
        },
        Location: {
            type: {
                lat: { type: Number, required: true },
                lng: { type: Number, required: true }
            },
            required: true
        }
    },
    {
        timestamps:true
    }
)
const OTP = mongoose.model( 'OTP', OTPSchema );
export default OTP;