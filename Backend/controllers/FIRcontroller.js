import FIR from "../models/FIRSchema.js";
import * as cloudinary from "cloudinary";


export const getAllFIRs = async function(req,res,next){
    const FIRs = await FIR.find({});
    res.json( FIRs );
}

export const getFIRById = async function(req,res,next){
    const {id} = req.params;
    try {
        const FIRs = await FIR.findById(id);
    res.json( {FIRs} );
    } catch (error) {
        next(error)
    }
    
}

export const createNewFIR = async function(req,res,next){
    const newFIR = req.body;
    

    await cloudinary.v2.uploader.upload(newFIR.file, {folder: 'E-FIR'}, (error, result)=>{
        
        let files = [];
        let secure_url = result.secure_url
        let public_id = result.public_id

        let file = {
            secure_url,
            public_id
        }
        files.push(file)
        newFIR.file = files
        console.log(newFIR);
      });

    try {
        const r = await FIR.create(newFIR);
    res.json({
        FIR:r
    });
    } catch (error) {
        next(error);
    }
}

export const updateFIR = async function(req,res,next){
    const {id} = req.params;
    const data = req.body;
    const UpdateFIR = await FIR.findByIdAndUpdate(id,data);
    res.json('FIR is Updated')
}

export const deleteFIR = async function(req,res,next){
    const {id} = req.params;
    const DeleteFIR = await FIR.findByIdAndDelete(id);
    res.json('FIR is Delete');
}