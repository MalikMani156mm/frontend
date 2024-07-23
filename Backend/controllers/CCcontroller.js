import CC from "../models/CCSchema.js";
import mongoose from 'mongoose';
import { imageUploading } from "../Utils/Utils.js";



export const getPoliceStationCertificates = async function (req, res, next) {

    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const policeStation = req.query.policeStation || "";
    let sort = req.query.sort || "_id";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1] === 'desc' ? -1 : 1;
    } else {
        sortBy[sort[0]] = 1;
    }

    try {
        let policeStationQuery = {};
        if (policeStation) {
            policeStationQuery = { PoliceStation: new mongoose.Types.ObjectId(policeStation) };
        }

        let totalPoliceStaionCertificatesResult = await CC.aggregate([
            {
                $addFields: {
                    CNICStr: { $toString: "$CNIC" },
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    $and: [
                        policeStationQuery,
                        {
                            "$or": [
                                { ApplicationtNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { CNICStr: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { Category: { $regex: search, $options: "i" } },
                                { District: { $regex: search, $options: "i" } },
                                { EntryDate: { $regex: search, $options: "i" } },
                                { Status: { $regex: search, $options: "i" } },
                            ]
                        }
                    ]
                }
            },
            { $count: "total" }
        ]);

        let totalPoliceStaionCertificates = totalPoliceStaionCertificatesResult.length > 0 ? totalPoliceStaionCertificatesResult[0].total : 0;

        let PoliceStaionCertificates = await CC.aggregate([
            {
                $addFields: {
                    CNICStr: { $toString: "$CNIC" },
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    $and: [
                        policeStationQuery,
                        {
                            "$or": [
                                { ApplicationtNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { CNICStr: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { Category: { $regex: search, $options: "i" } },
                                { District: { $regex: search, $options: "i" } },
                                { EntryDate: { $regex: search, $options: "i" } },
                                { Status: { $regex: search, $options: "i" } },
                            ]
                        }
                    ]
                }
            },
            { $sort: sortBy },
            { $skip: page * limit },
            { $limit: limit }
        ]);

        let PoliceStaionCertificatespageCount = Math.ceil(totalPoliceStaionCertificates / limit);

        res.json({
            PoliceStaionCertificates,
            totalPoliceStaionCertificates,
            PoliceStaionCertificatespageCount,
            page: page + 1,
            limit
        });
    } catch (error) {
        next(error);
    }
};

export const getCitizenCertificates = async function (req, res, next) {

    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const cnic = req.query.cnic || 0;
    let sort = req.query.sort || "_id";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1] === 'desc' ? -1 : 1;
    } else {
        sortBy[sort[0]] = 1;
    }

    try {
        let cnicQuery = {};

        if (cnic) {
            const cnicNumber = Number(cnic);
            if (!isNaN(cnicNumber)) {
                cnicQuery = { CNIC: cnicNumber };
            }
        }

        let totalCitizenCertificatesResult = await CC.aggregate([
            {
                $addFields: {
                    CNICStr: { $toString: "$CNIC" },
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    $and: [
                        cnicQuery,
                        {
                            "$or": [
                                { ApplicationtNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { CNICStr: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { Category: { $regex: search, $options: "i" } },
                                { EntryDate: { $regex: search, $options: "i" } },
                                { Status: { $regex: search, $options: "i" } },
                            ]
                        }
                    ]
                }
            },
            { $count: "cnictotal" }
        ]);

        let totalCitizenCertificates = totalCitizenCertificatesResult.length > 0 ? totalCitizenCertificatesResult[0].cnictotal : 0;

        let CitizenCertificates = await CC.aggregate([
            {
                $addFields: {
                    CNICStr: { $toString: "$CNIC" },
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    $and: [
                        cnicQuery,
                        {
                            "$or": [
                                { ApplicationtNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { CNICStr: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { Category: { $regex: search, $options: "i" } },
                                { EntryDate: { $regex: search, $options: "i" } },
                                { Status: { $regex: search, $options: "i" } },
                            ]
                        }
                    ]
                }
            },
            { $sort: sortBy },
            { $skip: page * limit },
            { $limit: limit }
        ]);

        let CitizenCertificatespageCount = Math.ceil(totalCitizenCertificates / limit);

        res.json({
            CitizenCertificates,
            totalCitizenCertificates,
            CitizenCertificatespageCount,
            page: page + 1,
            limit
        });

    } catch (error) {
        next(error);
    }
};

export const getCertificateById = async function (req, res, next) {
    const { id } = req.params;
    try {
        const CCs = await CC.findById(id);
        res.json({ CCs });
    } catch (error) {
        next(error)
    }

}

export const changeCertificateStatus = async function (req, res, next) {
    const { id } = req.params;
    const { Status }  = req.body;
    try {
        const changeStatus = await CC.findOneAndUpdate({ _id: id }, { Status }, { new: true });
        if (!changeStatus) {
            return res.json({
                message: 'Certificate not found',
                success: false
            });
        }
        // const htmlTemplate = FIRStatusHtmlTemplate(changeStatus.Name,changeStatus.ComplaintNumber,changeStatus.Circle,Status)
        // sendMail(changeStatus.email, `FIR Status Updated!!!`, "", htmlTemplate)
        res.json({
            changeStatus,
            message: 'Status is updated successfully',
            success: true
        })

    } catch (error) {
        next(error)
    }
}

export const changeCertificatePoliceStation = async function (req, res, next) {
    const { id } = req.params;
    const { PoliceStation }  = req.body;
    try {
        const changePoliceStation = await CC.findOneAndUpdate({ _id: id }, { PoliceStation }, { new: true });
        if (!changePoliceStation) {
            return res.json({
                message: 'Certificate not found',
                success: false
            });
        }
        res.json({
            changePoliceStation,
            message: 'The Certificate is transfered successfully',
            success: true
        })

    } catch (error) {
        next(error)
    }
}

export const updateCertificateRating = async function (req, res, next) {
    const { id } = req.params;
    const { Rating } = req.body;
    try {
        const changeRating = await CC.findOneAndUpdate({ _id: id }, { Rating }, { new: true });
        if (!changeRating) {
            return res.json({
                message: 'Certificate not found',
                success: false
            });
        }
        res.json({
            changeRating,
            message: 'Rating is updated successfully',
            success: true
        })

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
    try {
        const UpdateCertificate = await CC.findByIdAndUpdate(id, data);
        if(!UpdateCertificate){
        return res.json({
            message: 'Certificate is not found',
            success: false
        })
    }
    res.json({
        uc:UpdateCertificate,
        message: 'Certificate is  Updated Successfully',
        success: true
    })
    } catch (error) {
        next(error);
    }
}

export const deleteCertificate = async function (req, res, next) {
    const { id } = req.params;
    const DeleteCertificate = await CC.findByIdAndDelete(id);
    res.json({
        message: 'Certificate is Deleted',
        success: true
    });
}