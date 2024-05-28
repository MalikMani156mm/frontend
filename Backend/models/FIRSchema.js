import mongoose from "mongoose";
const { Schema } = mongoose;



const FIRsSchema = new Schema(
    {
        EntryDate: {
            type: String,
            require: [true, 'Please provide the Date']
        },
        SourceOfComplaint: {
            type: String
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
            type: String,
            require: [true, 'Please provide the Police Station']
        },
        BeatMoza: {
            type: String
        },
        CNIC: {
            type: Number,
            // require:[true, 'Please provide the CNIC'],
            // min:[13, 'without dash 13 number'],
            // max:[15, 'wit hdash 15 number']
        },
        email: {
            type: String,
            require: [true, 'Please provide the Email']
        },
        Name: {
            type: String,
            require: [true, 'Please provide the Name'],
            min: [5, 'At least of 5 words'],
            max: [30, 'Maximum limit of 30 words']
        },
        relation: {
            type: String,
            enum: ['son','daughter','wife']
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
            // require:[true, 'Please provide the Contact Number'],
            // min:[11, 'At least of 11 number'],
            // max:[13, 'Maximum limit of 13 number']
        },
        PermanentAddress: {
            type: String,
            require: [true, 'Please provide the PermanentAddress'],
            max: [200, 'Maximum limit of 200 words']
        },
        placeOfOccurance: {
            type: String,
            require: [true, 'Please provide the Place of Occurance']
        },
        IncidentDate: {
            type: String,
            require: [true, 'Please provide the Incident Date']
        },
        Category: {
            type: String,
            require: [true, 'Please provide the Category']
        },
        Offence: {
            type: String,
            require: [true, 'Please provide the Offence']
        },
        OffenceSubcategory: {
            type: String,
        },
        AssignedTo: {
            type: String,
        },
        OfficerName: {
            type: String,
        },
        OfficerContact: {
            type: Number,
        },
        IncidentDetails: {
            type: String,
            require: [true, 'Please provide the IncidentDetails'],
            max: [1000, 'Maximum limit of 1000 words']
        },
        FIRRegistered: {
            type: String,
            enum: ['Yes','No']
        },
        FIRNo: {
            type: String,
        },
        IOName: {
            type: String,
        },
        file: [{
            secure_url: String,
            public_id: String,
        }],

    }
)

const FIR = mongoose.model('FIR', FIRsSchema);
export default FIR;