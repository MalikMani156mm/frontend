import FIR from "../models/FIRSchema.js";
import PoliceStaion from "../models/PoliceStationSchema.js"
import { imageUploading } from "../Utils/Utils.js";


export const getAllFIRs = async function (req, res, next) {
    const FIRs = await FIR.find({});
    res.json(FIRs);
}

export const getFIRById = async function (req, res, next) {
    const { id } = req.params;
    try {
        const FIRs = await FIR.findById(id);
        res.json({ FIRs });
    } catch (error) {
        next(error)
    }

}

export const createNewFIR = async function (req, res, next) {
    const newFIR = req.body;


    // await cloudinary.v2.uploader.upload(newFIR.file, {folder: 'E-FIR'}, (error, result)=>{

    //     let files = [];
    //     let secure_url = result.secure_url
    //     let public_id = result.public_id

    //     let file = {
    //         secure_url,
    //         public_id
    //     }
    //     files.push(file)
    //     newFIR.file = files
    //   });

    try {
        const imageURL = await imageUploading({
            folder: 'FIRs',
            image: newFIR.file,
        })

        newFIR.file = imageURL;

        const r = await FIR.create(newFIR);
        const PSId = r.PoliceStation.toString();
        const policeStation = await PoliceStaion.findById(PSId)
        const FIRId = r._id.toString();
        const newFIRS = [...policeStation.FIRs, FIRId.toString()]
        policeStation.FIRs = newFIRS;
        const updatePoliceStation = await PoliceStaion.findByIdAndUpdate( PSId , policeStation);
        res.json({
            FIR: r,
            message: "FIR Submitted Successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const updateFIR = async function (req, res, next) {
    const { id } = req.params;
    const data = req.body;
    const UpdateFIR = await FIR.findByIdAndUpdate(id, data);
    res.json({
        message: 'FIR is Updated',
        success: true
    })
}

export const deleteFIR = async function (req, res, next) {
    const { id } = req.params;
    const DeleteFIR = await FIR.findByIdAndDelete(id);
    res.json({
        message: 'FIR is Deleted',
        success: true
    });
}