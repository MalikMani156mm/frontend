import PS from "../models/PoliceStationSchema.js";


export const getAllPoliceStations = async function (req, res, next) {
    try {
        const PSs = await PS.find({}).populate('FIRs Certificates');
        res.json(PSs);
    } catch (error) {
        next(error)
    }

}

export const getPoliceStationById = async function (req, res, next) {
    const { id } = req.params;
    try {
        const PSs = await PS.findById(id);
        res.json({ PSs });
    } catch (error) {
        next(error)
    }

}

export const createNewPoliceStation = async function (req, res, next) {
    const newPoliceStation = req.body;

    try {
        const resp = await PS.create(newPoliceStation);
        res.json({
            PoliceStation: resp,
            message: "PoliceStation is created Successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const updatePoliceStation = async function (req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
        const UpdatePoliceStation = await PS.findByIdAndUpdate(id,data,{ new: true });
        if (!UpdatePoliceStation) {
            return res.json({
                message: 'PoliceStation  not found',
                success: false
            });
        }
        res.json({
            message: 'PoliceStation is Updated',
            success: true
        })
    } catch (error) {
        next(error);
    }
}

export const deletePoliceStation = async function (req, res, next) {
    const { id } = req.params;
    try {
        const DeletePoliceStation = await PS.findByIdAndDelete(id);
    res.json({
        message: 'PoliceStation is Deleted',
        success: true
    });
    } catch (error) {
        next(error)
    }
    
}