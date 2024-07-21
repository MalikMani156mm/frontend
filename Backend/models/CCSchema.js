import mongoose from "mongoose";
const { Schema } = mongoose;



const CCSchema = new Schema(
    {
        EntryDate: {
            type: String,
            require: [true, 'Please provide the Date']
        },
        SourceOfApplication: {
            type: String,
            default: 'Online'
        },
        ApplicationtNumber: {
            type: String,
            unique: true
        },
        District: {
            type: String,
            require: [true, 'Please provide the District']
        },
        Division: {
            type: String,
            require: [true, 'Please provide the Division']
        },
        Circle: {
            type: String,
            require: [true, 'Please provide the Circle']
        },
        PoliceStation: {
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
        PassportNumber: {
            type: String,
            require: [true, 'Please provide the Passport Number'],
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
        Category: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        SubmitByApplicant: {
            type: String,
            enum: ['Yes', 'No']
        },
        SubmitterName: {
            type: String,
            require: [true, 'Please provide the Name'],
            min: [5, 'At least of 5 words'],
            max: [30, 'Maximum limit of 30 words']
        },
        RelationWithApplicant: {
            type: String,
            require: [true, 'Please provide the Category']
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
        PassportInfoPic: {
            type: String
        },
        PassportLastPic: {
            type: String
        },
        ApplicantPic: {
            type: String
        },
        AffidavitPic: {
            type: String
        },
        AuthorityLetterPic: {
            type: String
        },
        AffidavitPicture: {
            type: String
        },
        Status: {
            type: String,
            default: 'pending',
            enum: ['pending', 'approved', 'rejected']
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

const CC = mongoose.model('CharacterCertificate', CCSchema);
export default CC;