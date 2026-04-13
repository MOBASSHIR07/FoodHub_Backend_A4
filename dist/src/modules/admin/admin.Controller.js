import { adminService } from "./admin.Service.js";
const getAllUsers = async (req, res, next) => {
    try {
        const result = await adminService.getAllUsersDB();
        res.status(201).json({
            success: true,
            message: "All user Retrived",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!id) {
            throw new Error('User ID is required');
        }
        const result = await adminService.updateStatusDB(status, id);
        res.status(201).json({
            success: true,
            message: "Status changed!",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const createCategory = async (req, res, next) => {
    try {
        const result = await adminService.createCategoryDB(req.body);
        res.status(201).json({ success: true, message: "Category created", data: result });
    }
    catch (error) {
        next(error);
    }
};
const getAllCategories = async (req, res, next) => {
    try {
        const result = await adminService.getAllCategoriesDB();
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await adminService.updateCategoryDB(id, req.body);
        res.status(200).json({ success: true, message: "Category updated", data: result });
    }
    catch (error) {
        next(error);
    }
};
const deleteCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        await adminService.deleteCategoryDB(id);
        res.status(200).json({ success: true, message: "Category deleted" });
    }
    catch (error) {
        next(error);
    }
};
const getAllOrders = async (req, res, next) => {
    try {
        const result = await adminService.getAllOrdersDB(req.query);
        res.status(200).json({
            success: true,
            message: "All system orders retrieved successfully",
            meta: result.meta,
            data: result.orders
        });
    }
    catch (error) {
        next(error);
    }
};
export const adminController = {
    getAllUsers,
    updateStatus,
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
    getAllOrders
};
//# sourceMappingURL=admin.Controller.js.map