import VV from "../models/VVSchema.js";
import { imageUploading } from "../Utils/Utils.js";


export const getPoliceStationRequests = async function (req, res, next) {

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
        let Requests = await VV.aggregate([
            {
                $addFields: {
                    CNICStr: { $toString: "$CNIC" },
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    "$or": [
                        { RequestNumber: { $regex: search, $options: "i" } },
                        { Name: { $regex: search, $options: "i" } },
                        { CNICStr: { $regex: search } },
                        { ContactNumberStr: { $regex: search } },
                        { RegistrationNumber: { $regex: search, $options: "i" } },
                        { Make: { $regex: search, $options: "i" } },
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
        let totalRequestResult = await VV.aggregate([
            {
                $addFields: {
                    CNICStr: { $toString: "$CNIC" },
                    ContactNumberStr: { $toString: "$ContactNumber" }
                }
            },
            {
                $match: {
                    "$or": [
                        { RequestNumber: { $regex: search, $options: "i" } },
                        { Name: { $regex: search, $options: "i" } },
                        { CNICStr: { $regex: search } },
                        { ContactNumberStr: { $regex: search } },
                        { RegistrationNumber: { $regex: search, $options: "i" } },
                        { Make: { $regex: search, $options: "i" } },
                        { EntryDate: { $regex: search, $options: "i" } },
                        { Status: { $regex: search, $options: "i" } },

                    ]
                }
            },
            { $count: "total" }
        ]);

        let totalRequest = totalRequestResult.length > 0 ? totalRequestResult[0].total : 0;
        let pageCount = Math.ceil(totalRequest / limit);

        res.json({
            Requests,
            totalRequest,
            pageCount,
            page: page + 1,
            limit
        });
    } catch (error) {
        next(error);
    }
};

export const getCitizenRequests = async function (req, res, next) {

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

        let totalCitizenRequestsResult = await VV.aggregate([
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
                                { RequestNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { CNICStr: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { RegistrationNumber: { $regex: search, $options: "i" } },
                                { Make: { $regex: search, $options: "i" } },
                                { EntryDate: { $regex: search, $options: "i" } },
                                { Status: { $regex: search, $options: "i" } },
                            ]
                        }
                    ]
                }
            },
            { $count: "cnictotal" }
        ]);

        let totalCitizenRequests = totalCitizenRequestsResult.length > 0 ? totalCitizenRequestsResult[0].cnictotal : 0;

        let CitizenRequests = await VV.aggregate([
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
                                { RequestNumber: { $regex: search, $options: "i" } },
                                { Name: { $regex: search, $options: "i" } },
                                { CNICStr: { $regex: search } },
                                { ContactNumberStr: { $regex: search } },
                                { RegistrationNumber: { $regex: search, $options: "i" } },
                                { Make: { $regex: search, $options: "i" } },
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

        let CitizenRequestspageCount = Math.ceil(totalCitizenRequests / limit);

        res.json({
            CitizenRequests,
            totalCitizenRequests,
            CitizenRequestspageCount,
            page: page + 1,
            limit
        });

    } catch (error) {
        next(error);
    }
};

export const getRequestById = async function (req, res, next) {
    const { id } = req.params;
    try {
        const VVs = await VV.findById(id);
        res.json({ VVs });
    } catch (error) {
        next(error)
    }

}

export const changeRequestStatus = async function (req, res, next) {
    const { id } = req.params;
    const { Status } = req.body;
    try {
        const changeStatus = await VV.findOneAndUpdate({ _id: id }, { Status }, { new: true });
        if (!changeStatus) {
            return res.json({
                message: 'Request not found',
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

export const createNewRequest = async function (req, res, next) {
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
            Request: resp,
            message: "Verification Request Submitted Successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const updateRequest = async function (req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
        const UpdateRequest = await VV.findByIdAndUpdate(id, data);
        if (!UpdateRequest) {
            return res.json({
                message: 'Verification Request is not found',
                success: true
            })
        }
        res.json({
            ur: UpdateRequest,
            message: 'Verification Request is Updated',
            success: true
        })

    } catch (error) {
        next(error);

    }
}

export const deleteRequest = async function (req, res, next) {
    const { id } = req.params;
    const DeleteRequest = await VV.findByIdAndDelete(id);
    res.json({
        message: 'Verification Request is Deleted',
        success: true
    });
}