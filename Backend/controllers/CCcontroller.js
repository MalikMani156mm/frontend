import CC from "../models/CCSchema.js";
import { imageUploading } from "../Utils/Utils.js";


export const getAllCertificates = async function (req, res, next) {
    const CCs = await CC.find({});
    res.json(CCs);
}

export const getCertificateById = async function (req, res, next) {
    const { id } = req.params;
    try {
        const CCs = await CC.findById(id);
        res.json({ CCs });
    } catch (error) {
        next(error)
    }

}

export const createNewCertificate = async function (req, res, next) {
    const newCertificate = req.body;

    const CNICFrontURL = await imageUploading({
        folder: 'Certificates',
        image: newCertificate.CNICFront,
    })

    newCertificate.CNICFront = CNICFrontURL;

    const CNICBackURL = await imageUploading({
        folder: 'Certificates',
        image: newCertificate.CNICBack,
    })

    newCertificate.CNICBack = CNICBackURL;

    const PassportInfoPicURL = await imageUploading({
        folder: 'Certificates',
        image: newCertificate.PassportInfoPic,
    })

    newCertificate.PassportInfoPic = PassportInfoPicURL;

    const PassportLastPicURL = await imageUploading({
        folder: 'Certificates',
        image: newCertificate.PassportLastPic,
    })

    newCertificate.PassportLastPic = PassportLastPicURL;

    const ApplicantPicURL = await imageUploading({
        folder: 'Certificates',
        image: newCertificate.ApplicantPic,
    })

    newCertificate.ApplicantPic = ApplicantPicURL;

    const AffidavitPicURL = await imageUploading({
        folder: 'Certificates',
        image: newCertificate.AffidavitPic
    })

    newCertificate.AffidavitPic = AffidavitPicURL;

    const AuthorityLetterPicURL = await imageUploading({
        folder: 'Certificates',
        image: newCertificate.AuthorityLetterPic,
    })

    newCertificate.AuthorityLetterPic = AuthorityLetterPicURL;

    const AffidavitPictureURL = await imageUploading({
        folder: 'Certificates',
        image: newCertificate.AffidavitPicture,
    })

    newCertificate.AffidavitPicture = AffidavitPictureURL;


    try {
        const resp = await CC.create(newCertificate);
        res.json({
            Certificate: resp,
            message: "Certificate Request Submitted Successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const updateCertificate = async function (req, res, next) {
    const { id } = req.params;
    const data = req.body;
    const UpdateCertificate = await CC.findByIdAndUpdate(id, data);
    res.json({
        message: 'Certificate is Updated',
        success: true
    })
}

export const deleteCertificate = async function (req, res, next) {
    const { id } = req.params;
    const DeleteCertificate = await CC.findByIdAndDelete(id);
    res.json({
        message: 'Certificate is Deleted',
        success: true
    });
}