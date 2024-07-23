import mongoose from 'mongoose';
import FIR from "../models/FIRSchema.js";
import PoliceStaion from "../models/PoliceStationSchema.js"
import { imageUploading } from "../Utils/Utils.js";
import { FIRStatusHtmlTemplate, FIRSubmitHtmlTemplate } from '../Utils/htmlTemplate.js';
import { sendMail } from '../middleware/sendEmail.js';



export const getAllFIRs = async function (req, res, next) {

    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    let sort = req.query.sort || "_id";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1] === 'desc' ? -1 : 1;
    } else {
        sortBy[sort[0]] = 1;
    }

    try {
        //Fetch FIRs with search criteria
        let FIRs = await FIR.aggregate([
            {
                $addFields: {
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    "$or": [
                        { ComplaintNumber: { $regex: search, $options: "i" } },
                        { Name: { $regex: search, $options: "i" } },
                        { OfficerName: { $regex: search } },
                        { ContactNumberStr: { $regex: search } },
                        { Category: { $regex: search, $options: "i" } },
                        { Offence: { $regex: search, $options: "i" } },
                        { EntryDate: { $regex: search, $options: "i" } },
                        { Status: { $regex: search, $options: "i" } },
                    ]
                }
            },
            { $sort: sortBy },
            { $skip: page * limit },
            { $limit: limit }
        ]);

        // Total count with search criteria
        let totalResult = await FIR.aggregate([
            {
                $addFields: {
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    "$or": [
                        { ComplaintNumber: { $regex: search, $options: "i" } },
                        { Name: { $regex: search, $options: "i" } },
                        { OfficerName: { $regex: search } },
                        { ContactNumberStr: { $regex: search } },
                        { Category: { $regex: search, $options: "i" } },
                        { Offence: { $regex: search, $options: "i" } },
                        { EntryDate: { $regex: search, $options: "i" } },
                        { Status: { $regex: search, $options: "i" } },
                    ]
                }
            },
            { $count: "total" }
        ]);

        let total = totalResult.length > 0 ? totalResult[0].total : 0;
        let pagecount = Math.ceil(total / limit);
        res.json({
            FIRs,
            total,
            pagecount,
            page: page + 1,
            limit
        });
    } catch (error) {
        next(error);
    }
};

export const getPoliceStationFIRs = async function (req, res, next) {

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

        let totalPoliceStaionFIRsResult = await FIR.aggregate([
            {
                $addFields: {
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    $and: [
                        policeStationQuery,
                        {
                            "$or": [
                                { ComplaintNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { OfficerName: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { Category: { $regex: search, $options: "i" } },
                                { Offence: { $regex: search, $options: "i" } },
                                { EntryDate: { $regex: search, $options: "i" } },
                                { Status: { $regex: search, $options: "i" } },
                            ]
                        }
                    ]
                }
            },
            { $count: "total" }
        ]);

        let totalPoliceStaionFIRs = totalPoliceStaionFIRsResult.length > 0 ? totalPoliceStaionFIRsResult[0].total : 0;

        let PoliceStaionFIRs = await FIR.aggregate([
            {
                $addFields: {
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    $and: [
                        policeStationQuery,
                        {
                            "$or": [
                                { ComplaintNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { OfficerName: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { Category: { $regex: search, $options: "i" } },
                                { Offence: { $regex: search, $options: "i" } },
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

        let PoliceStaionFIRspageCount = Math.ceil(totalPoliceStaionFIRs / limit);

        res.json({
            PoliceStaionFIRs,
            totalPoliceStaionFIRs,
            PoliceStaionFIRspageCount,
            page: page + 1,
            limit
        });
    } catch (error) {
        next(error);
    }
};

export const getCitizenFIRs = async function (req, res, next) {

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

        let totalCitizenFIRsResult = await FIR.aggregate([
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
                                { ComplaintNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { CNICStr: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { Category: { $regex: search, $options: "i" } },
                                { Offence: { $regex: search, $options: "i" } },
                                { EntryDate: { $regex: search, $options: "i" } },
                                { Status: { $regex: search, $options: "i" } },
                            ]
                        }
                    ]
                }
            },
            { $count: "cnictotal" }
        ]);

        let totalCitizenFIRs = totalCitizenFIRsResult.length > 0 ? totalCitizenFIRsResult[0].cnictotal : 0;

        let CitizenFIRs = await FIR.aggregate([
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
                                { ComplaintNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { CNICStr: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { Category: { $regex: search, $options: "i" } },
                                { Offence: { $regex: search, $options: "i" } },
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

        let CitizenFIRspageCount = Math.ceil(totalCitizenFIRs / limit);

        res.json({
            CitizenFIRs,
            totalCitizenFIRs,
            CitizenFIRspageCount,
            page: page + 1,
            limit
        });

    } catch (error) {
        next(error);
    }
};

export const searchFIRs = async function (req, res, next) {

    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 10;
    const year = req.query.year || "";
    const province = req.query.province || "";
    const district = req.query.district || "";
    const division = req.query.division || "";
    const circle = req.query.circle || "";
    const policeStation = req.query.policeStation || "";
    const name = req.query.name || "";
    const guardianName = req.query.guardianName || "";
    const cnic = req.query.cnic || "";
    const contactNumber = req.query.contactNumber || "";
    const complaintNumber = req.query.complaintNumber || "";
    const status = req.query.status || "";
    let sort = req.query.sort || "_id";
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort])

    let sortBy = {};
    if (sort[1]) {
        sortBy[sort[0]] = sort[1] === 'desc' ? -1 : 1;
    } else {
        sortBy[sort[0]] = 1;
    }

    try {

        const matchConditions = {
            "$and": [
                year ? { EntryDate: { $regex: year } } : {},
                province ? { IncidentDetails: { $regex: province, $options: "i" } } : {},
                complaintNumber ? { ComplaintNumber: { $regex: complaintNumber, $options: "i" } } : {},
                name ? { Name: { $regex: name, $options: "i" } } : {},
                cnic ? { CNIC: Number(cnic) } : {},
                contactNumber ? { ContactNumber: Number(contactNumber) } : {},
                guardianName ? { GuardianName: { $regex: guardianName, $options: "i" } } : {},
                status ? { Status: { $regex: status, $options: "i" } } : {},
                district ? { District: { $regex: district, $options: "i" } } : {},
                division ? { Division: { $regex: division, $options: "i" } } : {},
                circle ? { Circle: { $regex: circle, $options: "i" } } : {},
                policeStation ? { PoliceStation: new mongoose.Types.ObjectId(policeStation) } : {}
            ].filter(Boolean)
        };
        //Fetch FIRs with search criteria
        let FIRs = await FIR.aggregate([
            {
                $addFields: {
                    CNICStr: { $toString: "$CNIC" },
                    ContactNumberStr: { $toString: "$ContactNumber" },
                    PoliceStaionStr: { $toString: "$PoliceStation" }
                }
            },
            { $match: matchConditions },
            { $sort: sortBy },
            { $skip: page * limit },
            { $limit: limit }
        ]);

        // Total count with search criteria
        let totalResult = await FIR.aggregate([
            {
                $addFields: {
                    CNICStr: { $toString: "$CNIC" },
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            { $match: matchConditions },
            { $count: "total" }
        ]);

        let total = totalResult.length > 0 ? totalResult[0].total : 0;
        let pageCount = Math.ceil(total / limit);

        res.json({
            FIRs,
            total,
            pageCount,
            page: page + 1,
            limit
        });
    } catch (error) {
        next(error);
    }
};

export const getAllFIRCount = async function (req, res, next) {
    try {
        const pending = "pending";
        const filed = "filed";
        const completed = "completed";

        let totalResult = await FIR.aggregate([
            { $count: "total" }
        ]);

        let total = totalResult.length > 0 ? totalResult[0].total : 0;

        let totalpending = await FIR.aggregate([
            {
                $match:
                    { Status: { $regex: pending, $options: "i" } }
            },
            { $count: "totalpending" }
        ]);

        let totalPending = totalpending.length > 0 ? totalpending[0].totalpending : 0;

        let totalfiled = await FIR.aggregate([
            {
                $match: { Status: { $regex: filed, $options: "i" } }
            },
            { $count: "totalfiled" }
        ]);

        let totalFiled = totalfiled.length > 0 ? totalfiled[0].totalfiled : 0;

        let totalcompleted = await FIR.aggregate([
            {
                $match: { Status: { $regex: completed, $options: "i" } }
            },
            { $count: "totalcompleted" }
        ]);

        let totalCompleted = totalcompleted.length > 0 ? totalcompleted[0].totalcompleted : 0;
        res.json({
            total,
            totalPending,
            totalFiled,
            totalCompleted,
        })

    } catch (error) {
        next(error);
    }
}

export const getPoliceStationFIRCount = async function (req, res, next) {
    const pending = "pending";
    const filed = "filed";
    const completed = "completed";
    const policeStation = req.query.policeStation || "";
    try {
        let policeStationQuery = {};
        if (policeStation) {
            policeStationQuery = { PoliceStation: new mongoose.Types.ObjectId(policeStation) };
        }

        let totalPoliceStaionFIRsResult = await FIR.aggregate([
            { $match: policeStationQuery },
            { $count: "total" }
        ]);

        let totalPoliceStaionFIRs = totalPoliceStaionFIRsResult.length > 0 ? totalPoliceStaionFIRsResult[0].total : 0;

        let totalPoliceStaionPendingFIRsResult = await FIR.aggregate([
            {
                $match:
                {
                    $and: [
                        policeStationQuery,
                        {
                            "$or": [{ Status: { $regex: pending, $options: "i" } }],

                        }
                    ]
                }

            },
            { $count: "totalPending" }
        ]);

        let totalPoliceStaionPendingFIRsTotal = totalPoliceStaionPendingFIRsResult.length > 0 ? totalPoliceStaionPendingFIRsResult[0].totalPending : 0;

        let totalPoliceStaionFiledFIRsResult = await FIR.aggregate([
            {
                $match:
                {
                    $and: [
                        policeStationQuery,
                        {
                            "$or": [{ Status: { $regex: filed, $options: "i" } }],

                        }
                    ]
                }

            },
            { $count: "totalFiled" }
        ]);

        let totalPoliceStaionFiledFIRsTotal = totalPoliceStaionFiledFIRsResult.length > 0 ? totalPoliceStaionFiledFIRsResult[0].totalFiled : 0;

        let totalPoliceStaionCompletedFIRsResult = await FIR.aggregate([
            {
                $match:
                {
                    $and: [
                        policeStationQuery,
                        {
                            "$or": [{ Status: { $regex: completed, $options: "i" } }],

                        }
                    ]
                }

            },
            { $count: "totalCompleted" }
        ]);

        let totalPoliceStaionCompletedFIRsTotal = totalPoliceStaionCompletedFIRsResult.length > 0 ? totalPoliceStaionCompletedFIRsResult[0].totalCompleted : 0;

        res.json({
            totalPoliceStaionFIRs,
            totalPoliceStaionPendingFIRsTotal,
            totalPoliceStaionFiledFIRsTotal,
            totalPoliceStaionCompletedFIRsTotal
        })
    } catch (error) {
        next(error);
    }
}

export const getCitizenFIRCount = async function (req, res, next) {
    const pending = "pending";
    const filed = "filed";
    const completed = "completed";
    const cnic = req.query.cnic || 0;
    try {
        let cnicQuery = {};

        if (cnic) {
            const cnicNumber = Number(cnic);
            if (!isNaN(cnicNumber)) {
                cnicQuery = { CNIC: cnicNumber };
            }
        }

        let totalCitizenFIRsResult = await FIR.aggregate([
            { $match: cnicQuery },
            { $count: "total" }
        ]);

        let totalCitizenFIRs = totalCitizenFIRsResult.length > 0 ? totalCitizenFIRsResult[0].total : 0;

        let totalCitizenPendingFIRsResult = await FIR.aggregate([
            {
                $match:
                {
                    $and: [
                        cnicQuery,
                        {
                            "$or": [{ Status: { $regex: pending, $options: "i" } }],

                        }
                    ]
                }

            },
            { $count: "totalPending" }
        ]);

        let totalCitizenPendingFIRsTotal = totalCitizenPendingFIRsResult.length > 0 ? totalCitizenPendingFIRsResult[0].totalPending : 0;

        let totalCitizenFiledFIRsResult = await FIR.aggregate([
            {
                $match:
                {
                    $and: [
                        cnicQuery,
                        {
                            "$or": [{ Status: { $regex: filed, $options: "i" } }],

                        }
                    ]
                }

            },
            { $count: "totalFiled" }
        ]);

        let totalCitizenFiledFIRsTotal = totalCitizenFiledFIRsResult.length > 0 ? totalCitizenFiledFIRsResult[0].totalFiled : 0;

        let totalCitizenCompletedFIRsResult = await FIR.aggregate([
            {
                $match:
                {
                    $and: [
                        cnicQuery,
                        {
                            "$or": [{ Status: { $regex: completed, $options: "i" } }],

                        }
                    ]
                }

            },
            { $count: "totalCompleted" }
        ]);

        let totalCitizenCompletedFIRsTotal = totalCitizenCompletedFIRsResult.length > 0 ? totalCitizenCompletedFIRsResult[0].totalCompleted : 0;

        res.json({
            totalCitizenFIRs,
            totalCitizenPendingFIRsTotal,
            totalCitizenFiledFIRsTotal,
            totalCitizenCompletedFIRsTotal
        })

    } catch (error) {
        next(error);
    }
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
        const updatePoliceStation = await PoliceStaion.findByIdAndUpdate(PSId, policeStation);
        const htmlTemplate = FIRSubmitHtmlTemplate(newFIR.Name, newFIR.ComplaintNumber, newFIR.Circle)
        sendMail(newFIR.email, `FIR Submitted Successfully!!!`, "", htmlTemplate)
        res.json({
            FIR: r,
            message: "FIR Submitted Successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const changeFIRStatus = async function (req, res, next) {
    const { id } = req.params;
    const { Status } = req.body;
    try {
        const changeStatus = await FIR.findOneAndUpdate({ _id: id }, { Status }, { new: true });
        if (!changeStatus) {
            return res.json({
                message: 'FIR not found',
                success: false
            });
        }
        const htmlTemplate = FIRStatusHtmlTemplate(changeStatus.Name, changeStatus.ComplaintNumber, changeStatus.Circle, Status)
        sendMail(changeStatus.email, `FIR Status Updated!!!`, "", htmlTemplate)
        res.json({
            changeStatus,
            message: 'Status is updated successfully',
            success: true
        })

    } catch (error) {
        next(error)
    }
}

export const updateFIRRating = async function (req, res, next) {
    const { id } = req.params;
    const { Rating } = req.body;
    try {
        const changeRating = await FIR.findOneAndUpdate({ _id: id }, { Rating }, { new: true });
        if (!changeRating) {
            return res.json({
                message: 'FIR not found',
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

export const changeFIRPoliceStation = async function (req, res, next) {
    const { id } = req.params;
    const { PoliceStation } = req.body;
    try {
        const changePoliceStation = await FIR.findOneAndUpdate({ _id: id }, { PoliceStation }, { new: true });
        if (!changePoliceStation) {
            return res.json({
                message: 'FIR not found',
                success: false
            });
        }
        res.json({
            changePoliceStation,
            message: 'The FIR is transfered successfully',
            success: true
        })

    } catch (error) {
        next(error)
    }
}

export const updateFIR = async function (req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
        const UpdateFIR = await FIR.findByIdAndUpdate(id, data, { new: true });
        if (!UpdateFIR) {
            return res.json({
                message: 'FIR not found',
                success: false
            });
        }
        res.json({
            uf: UpdateFIR,
            message: 'FIR is Updated',
            success: true
        })
    } catch (error) {
        next(error);
    }
}

export const deleteFIR = async function (req, res, next) {
    const { id } = req.params;
    const DeleteFIR = await FIR.findByIdAndDelete(id);
    res.json({
        message: 'FIR is Deleted',
        success: true
    });
}