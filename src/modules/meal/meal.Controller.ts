import { NextFunction, Request, Response } from "express";
import { mealService } from "./meal.Service.js";
import { prisma } from "../../lib/prisma.js";

const createMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
   
        const providerId = req.user?.id!; 
        const profile = await prisma.providerProfile.findUnique({
            where: { userId: providerId } 
        });
        if (!profile) {
            throw new Error("Provider profile not found. Please complete your profile first.");
        }

        const result = await mealService.createMealDB(profile.id, req.body);

        res.status(201).json({
            success: true,
            message: "Meal added to menu successfully!",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
};

export const mealController = {
    createMeal
};