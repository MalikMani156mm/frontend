import CC from "../models/CCSchema.js";
import * as cloudinary from "cloudinary";


export const getAllCertificates = async function(req,res,next){
    const CCs = await CC.find({});
    res.json( CCs );
}

export const getCertificateById = async function(req,res,next){
    const {id} = req.params;
    try {
        const CCs = await CC.findById(id);
    res.json( {CCs} );
    } catch (error) {
        next(error)
    }
    
}

export const createNewCertificate = async function(req,res,next){
    const newCertificate = req.body;
    

    // await cloudinary.v2.uploader.upload(newCertificate.file, {folder: 'E-FIR'}, (error, result)=>{
        
    //     let files = [];
    //     let secure_url = result.secure_url
    //     let public_id = result.public_id

    //     let file = {
    //         secure_url,
    //         public_id
    //     }
    //     files.push(file)
    //     newCertificate.file = files
    //   });

    try {
        const resp = await CC.create(newCertificate);
    res.json({
        Certificate:resp,
        message:"Certificate Request Submitted Successfully",
        success:true
    });
    } catch (error) {
        next(error);
    }
}

export const updateCertificate = async function(req,res,next){
    const {id} = req.params;
    const data = req.body;
    const UpdateCertificate = await CC.findByIdAndUpdate(id,data);
    res.json({
        message:'Certificate is Updated',
        success:true
    })
}

export const deleteCertificate = async function(req,res,next){
    const {id} = req.params;
    const DeleteCertificate = await CC.findByIdAndDelete(id);
    res.json({
        message:'Certificate is Deleted',
        success:true
    });
}