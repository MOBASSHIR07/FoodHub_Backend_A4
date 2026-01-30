import { NextFunction, Request, Response } from "express";
import { customerService } from "./customer.Service.js";

const updateProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id; 

        if (!userId) {
            throw new Error("UNAUTHORIZED");
        }

        const result = await customerService.updateCustomerProfileDB(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Customer profile updated successfully",
            data: result,
        });
    } catch (error: any) {
        next(error);
    }
};

export const customerController = {
    updateProfile,
};