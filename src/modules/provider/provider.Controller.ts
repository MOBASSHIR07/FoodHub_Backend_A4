import { NextFunction, Request, Response } from "express";
import { providerService } from "./provider.Service.js";

const getAllProviders = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await providerService.getAllProvidersDB();
        res.status(200).json({
            success: true,
            message: "Providers retrieved successfully",
            data: result
        });
    } catch (error) { next(error); }
};

const getProviderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await providerService.getProviderByIdDB(id as string);

        if (!result) {
            return res.status(404).json({ success: false, message: "Provider not found" });
        }

        res.status(200).json({
            success: true,
            message: "Provider profile and menu retrieved",
            data: result
        });
    } catch (error) { next(error); }
};

// const getProviderProfileWithMenu = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { id } = req.params;
//         const result = await providerService.getProviderProfileWithMenuDB(id as string);

//         if (!result) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Provider not found",
//             });
//         }

//         res.status(200).json({
//             success: true,
//             message: "Provider profile and menu retrieved successfully",
//             data: result
//         });
//     } catch (error) {
//         next(error);
//     }
// };



export const providerController = {
    getAllProviders,
    getProviderById,
}