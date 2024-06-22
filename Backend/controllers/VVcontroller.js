import VV from "../models/VVSchema.js"
import * as cloudinary from "cloudinary";


export const getAllRequests = async function(req,res,next){
    const VVs = await VV.find({});
    res.json( VVs );
}

export const getRequestById = async function(req,res,next){
    const {id} = req.params;
    try {
        const VVs = await VV.findById(id);
    res.json( {VVs} );
    } catch (error) {
        next(error)
    }
    
}

export const createNewRequest = async function(req,res,next){
    const newRequest = req.body;
    

    // await cloudinary.v2.uploader.upload(newRequest.file, {folder: 'E-FIR'}, (error, result)=>{
        
    //     let files = [];
    //     let secure_url = result.secure_url
    //     let public_id = result.public_id

    //     let file = {
    //         secure_url,
    //         public_id
    //     }
    //     files.push(file)
    //     newRequest.file = files
    //   });

    try {
        const resp = await VV.create(newRequest);
    res.json({
        Request:resp,
        message:"Verification Request Submitted Successfully",
        success:true
    });
    } catch (error) {
        next(error);
    }
}

export const updateRequest = async function(req,res,next){
    const {id} = req.params;
    const data = req.body;
    const UpdateRequest = await VV.findByIdAndUpdate(id,data);
    res.json({
        message:'Verification Request is Updated',
        success:true
    })
}

export const deleteRequest = async function(req,res,next){
    const {id} = req.params;
    const DeleteRequest = await VV.findByIdAndDelete(id);
    res.json({
        message:'Verification Request is Deleted',
        success:true
    });
}