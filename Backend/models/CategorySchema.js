import mongoose from "mongoose";
const { Schema } = mongoose;



const CategorySchema = new Schema(
    { 
       
        
        Category: {
            type: String,
            unique:true,
            require: [true, 'Please provide the Category']
        },
       
    }
)
const Category = mongoose.model( 'Category', CategorySchema );
export default Category;