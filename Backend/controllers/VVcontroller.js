import VV from "../models/VVSchema.js"
import { imageUploading } from "../Utils/Utils.js";


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
    
    const OCNICPicURL = await imageUploading({
        folder: 'VehicleVerification',
        image: newRequest.OCNICPic,
    })

    newRequest.OCNICPic = OCNICPicURL;
    
    const CNICFrontURL = await imageUploading({
        folder: 'VehicleVerification',
        image: newRequest.CNICFront,
    })

    newRequest.CNICFront = CNICFrontURL;

    const CNICBackURL = await imageUploading({
        folder: 'VehicleVerification',
        image: newRequest.CNICBack,
    })

    newRequest.CNICBack = CNICBackURL;

    const RegistrationBookPicURL = await imageUploading({
        folder: 'VehicleVerification',
        image: newRequest.RegistrationBookPic,
    })

    newRequest.RegistrationBookPic = RegistrationBookPicURL;

    const ChassisNumberPicURL = await imageUploading({
        folder: 'VehicleVerification',
        image: newRequest.ChassisNumberPic,
    })

    newRequest.ChassisNumberPic = ChassisNumberPicURL;

    const EngineNumberPicURL = await imageUploading({
        folder: 'VehicleVerification',
        image: newRequest.EngineNumberPic,
    })

    newRequest.EngineNumberPic = EngineNumberPicURL;

    const ApplicantPicURL = await imageUploading({
        folder: 'VehicleVerification',
        image: newRequest.ApplicantPic,
    })

    newRequest.ApplicantPic = ApplicantPicURL;


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