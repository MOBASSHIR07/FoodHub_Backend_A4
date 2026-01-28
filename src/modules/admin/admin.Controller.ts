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
        const {id} = req.params as {id :string}
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



export const adminController = {
    getAllUsers,
    updateStatus
}