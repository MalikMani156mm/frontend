import mongoose from "mongoose";
const { Schema } = mongoose;



const CNICSchema = new Schema(
    { 
       
        
        cnic: {
            type: Number,
        },
       
    }
)
const CNIC = mongoose.model( 'CNIC', CNICSchema );
export default CNIC;