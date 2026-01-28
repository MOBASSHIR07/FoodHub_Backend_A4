import { NextFunction, Request, Response } from "express";

const  getProfile = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        
       res.status(201).json({
         success: true,
         message : "Your Profile",
         data: req.user
       })

    } catch (error:any) {
        
        next(error)
    }
}

export const authController = {
    getProfile
}