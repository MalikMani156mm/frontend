import mongoose from "mongoose";
const { Schema } = mongoose;



const VVSchema = new Schema(
    {
        EntryDate: {
            type: String,
            require: [true, 'Please provide the Date']
        },
        SourceOfRequest: {
            type: String,
            default: 'Online'
        },
        RequestNumber: {
            type: String,
            unique: true
        },
        RequestTo: {
            type: String,
            require: [true, 'Please provide the District']
        },
        CNIC: {
            type: Number,
            require: [true, 'Please provide the CNIC'],
            // min:[13, 'without dash 13 number'],
            // max:[15, 'wit hdash 15 number']
        },
        Name: {
            type: String,
            require: [true, 'Please provide the Name'],
            min: [5, 'At least of 5 words'],
            max: [30, 'Maximum limit of 30 words']
        },
        relation: {
            type: String,
            enum: ['son', 'daughter', 'wife']
        },
        GuardianName: {
            type: String,
            require: [true, 'Please provide the Guardian Name'],
            min: [5, 'At least of 5 words'],
            max: [30, 'Maximum limit of 30 words']
        },
        Gender: {
            type: String,
            require: [true, 'Please provide the  Gender']
        },
        ContactNumber: {
            type: Number,
            require: [true, 'Please provide the Contact Number'],
            // min:[11, 'At least of 11 number'],
            // max:[13, 'Maximum limit of 13 number']
        },
        PermanentAddress: {
            type: String,
            require: [true, 'Please provide the PermanentAddress'],
            max: [300, 'Maximum limit of 200 words']
        },
        // OCNIC: {
        //     type: Number,
        //     require: [true, 'Please provide the CNIC'],
        //     // min:[13, 'without dash 13 number'],
        //     // max:[15, 'wit hdash 15 number']
        // },
        OCNICPic: [{
            secure_url: String,
            public_id: String,
        }],
        OName: {
            type: String,
            require: [true, 'Please provide the Name'],
            min: [5, 'At least of 5 words'],
            max: [30, 'Maximum limit of 30 words']
        },
        Orelation: {
            type: String,
            enum: ['son', 'daughter', 'wife']
        },
        OGuardianName: {
            type: String,
            require: [true, 'Please provide the Guardian Name'],
            min: [5, 'At least of 5 words'],
            max: [30, 'Maximum limit of 30 words']
        },
        OGender: {
            type: String,
            require: [true, 'Please provide the  Gender']
        },
        OContactNumber: {
            type: Number,
            require: [true, 'Please provide the Contact Number'],
            // min:[11, 'At least of 11 number'],
            // max:[13, 'Maximum limit of 13 number']
        },
        OPermanentAddress: {
            type: String,
            require: [true, 'Please provide the PermanentAddress'],
            max: [300, 'Maximum limit of 200 words']
        },
        RegistrationNumber: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        Make: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        Model: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        YearOfManufacture: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        Color: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        EngineNumber: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        ChassisNumber: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        BuyIt: {
            type: String,
            enum: ['Yes', 'No']
        },
        Reason: {
            type: String,
            require: [true, 'Please provide the IncidentDetails'],
            max: [2000, 'Maximum limit of 1000 words']
        },
        // CNICFront: [{
        //     secure_url: String,
        //     public_id: String,
        // }],
        // CNICBack: [{
        //     secure_url: String,
        //     public_id: String,
        // }],
        // ApplicantPic: [{
        //     secure_url: String,
        //     public_id: String,
        // }],
        // RegistrationBookPic: [{
        //     secure_url: String,
        //     public_id: String,
        // }],
        // ChassisNumberPic: [{
        //     secure_url: String,
        //     public_id: String,
        // }],
        // EngineNumberPic: [{
        //     secure_url: String,
        //     public_id: String,
        // }],
        Status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'Approved', 'filed']
        },
    },
    {
        timestamps: true
    }
)

const VV = mongoose.model('VehicleVerification', VVSchema);
export default VV;