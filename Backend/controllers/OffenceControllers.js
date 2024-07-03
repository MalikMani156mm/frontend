import Offence from "../models/OffenceSchema.js";


export const getAllOffences = async function (req, res, next) {
    try {
        const Offences = await Offence.find({});
        res.json(Offences);
    } catch (error) {
        next(error)
    }

}

export const getOffenceById = async function (req, res, next) {
    const { id } = req.params;
    try {
        const offence = await Offence.findById(id);
        res.json({ offence });
    } catch (error) {
        next(error)
    }

}

export const createNewOffence = async function (req, res, next) {
    const newOffence = req.body;

    try {
        const resp = await Offence.create(newOffence);
        res.json({
            Offence: resp,
            message: "Offence is stored Successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const updateOffence = async function (req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
        const UpdateOffence = await Offence.findByIdAndUpdate(id,data,{ new: true });
        if (!UpdateOffence) {
            return res.json({
                message: 'Offence not found',
                success: false
            });
        }
        res.json({
            message: 'Offence is Updated',
            success: true
        })
    } catch (error) {
        next(error);Offence
    }
}

export const deleteOffence = async function (req, res, next) {
    const { id } = req.params;
    const DeletePOffence = await Offence.findByIdAndDelete(id);
    res.json({
        message: 'Offence is Deleted',
        success: true
    });
}