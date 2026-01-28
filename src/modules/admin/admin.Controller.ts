import { NextFunction, Request, Response } from "express"
import { adminService } from "./admin.Service.js"
import { string } from "better-auth";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const result = await adminService.getAllUsersDB()

        res.status(201).json({
            success: true,
            message: "All user Retrived",
            data: result
        });

    } catch (error: any) {

        next(error)

    }
}

const updateStatus = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id } = req.params as { id: string }
        const { status } = req.body

        if (!id) {
            throw new Error('User ID is required');
        }

        const result = await adminService.updateStatusDB(status, id)

        res.status(201).json({
            success: true,
            message: "Status changed!",
            data: result
        });

    } catch (error: any) {

        next(error)

    }
}



const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await adminService.createCategoryDB(req.body);
        res.status(201).json({ success: true, message: "Category created", data: result });
    } catch (error) { next(error); }
};


const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await adminService.getAllCategoriesDB();
        res.status(200).json({ success: true, data: result });
    } catch (error) { next(error); }
};


const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        const result = await adminService.updateCategoryDB(id, req.body);
        res.status(200).json({ success: true, message: "Category updated", data: result });
    } catch (error) { next(error); }
};


const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params as { id: string };
        await adminService.deleteCategoryDB(id);
        res.status(200).json({ success: true, message: "Category deleted" });
    } catch (error) { next(error); }
};



export const adminController = {
    getAllUsers,
    updateStatus,
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory


}