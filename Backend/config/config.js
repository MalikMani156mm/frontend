import mongoose from 'mongoose';
import 'dotenv/config'
import * as cloudinary from "cloudinary";

export const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.DB_URL);
        console.log('Database Connected Sucessfully');
    } catch (error) {
        console.log('Connection Error', error);
    }

}

export const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
    });
}