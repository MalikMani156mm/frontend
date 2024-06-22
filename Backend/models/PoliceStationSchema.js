import mongoose from "mongoose";
const { Schema } = mongoose;



const PoliceStationSchema = new Schema(
    { 
        PSName: {
            type: String,
            require:[true, 'Please provide the Name'],
            unique:true,
        },
        PSLandlineNumber: {
            type: Number,
        },
        DPOName: {
            type: String,
        },
        DPOMobileNumber: {
            type: Number,
        },
        DPOLandlineNumber: {
            type: Number,
        },
        DPOReaderName: {
            type: String,
        },
        ReaderMobileNumber: {
            type: Number,
        },
        CircleOfficerName: {
            type: String,
        },
        CircleOfficerMobileNumber: {
            type: Number,
        },
        CircleOfficerLandlineNumber: {
            type: Number,
        },
        SHOName: {
            type: String,
        },
        SHOMobileNumber: {
            type: Number,
        },
        Division: {
            type: String,
        },
        Circle: {
            type: String,
        },
        Location: {
            type: String,
        },
    },
    {
        timestamps:true
    }
)
const PS = mongoose.model( 'PoliceStation', PoliceStationSchema );
export default PS;