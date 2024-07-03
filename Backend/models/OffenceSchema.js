import mongoose from "mongoose";
const { Schema } = mongoose;



const OffenceSchema = new Schema(
    { 
       
        
        Offence: {
            type: String,
            require: [true, 'Please provide the Offence'],
            unique:true,
        },
       
    }
)
const Offence = mongoose.model( 'Offence', OffenceSchema );
export default Offence;