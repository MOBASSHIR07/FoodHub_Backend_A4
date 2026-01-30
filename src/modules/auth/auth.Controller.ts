import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.Service.js";

const  getProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const userId = req.user?.id!
        const result = await authService.getProfileDB(userId)
       res.status(201).json({
         success: true,
         message : "Your Profile",
         data: result
       })

    } catch (error:any) {
        
        next(error)
    }
}

export const authController = {
    getProfile
}