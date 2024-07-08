import Category from "../models/CategorySchema.js";


export const getAllCategories = async function (req, res, next) {
    try {
        const Categories = await Category.find({});
        res.json(Categories);
    } catch (error) {
        next(error)
    }

}

export const getCategoryById = async function (req, res, next) {
    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        res.json({ category });
    } catch (error) {
        next(error)
    }

}

export const createNewCategory = async function (req, res, next) {
    const newCategory = req.body;

    try {
        const resp = await Category.create(newCategory);
        res.json({
            message: "Category is stored Successfully",
            success: true
        });
    } catch (error) {
        next(error);
    }
}

export const updateCategory = async function (req, res, next) {
    const { id } = req.params;
    const data = req.body;
    try {
        const UpdateCategory = await Category.findByIdAndUpdate(id,data,{ new: true });
        if (!UpdateCategory) {
            return res.json({
                message: 'Category not found',
                success: false
            });
        }
        res.json({
            message: 'Category is Updated',
            success: true
        })
    } catch (error) {
        next(error);
    }
}

export const deleteCategory = async function (req, res, next) {
    const { id } = req.params;
    const DeleteCategory = await Category.findByIdAndDelete(id);
    res.json({
        message: 'Category is Deleted',
        success: true
    });
}