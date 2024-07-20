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
            type:Schema.Types.ObjectId,
            ref:'PoliceStation',
            require: [true, 'Please provide the Police Station']
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
        OCNICPic: {
            type: String,
        },
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
        CNICFront: {
            type: String
        },
        CNICBack: {
            type: String
        },
        ApplicantPic: {
            type: String
        },
        RegistrationBookPic: {
            type: String
        },
        ChassisNumberPic: {
            type: String
        },
        EngineNumberPic: {
            type: String
        },
        Status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'verified', 'stolen']
        },
        Rating: {
            type: Number,
            default:'0',
            enum: ['0','1','2','3','4','5']
        }
    },
    {
        timestamps: true
    }
)

const VV = mongoose.model('VehicleVerification', VVSchema);
export default VV;