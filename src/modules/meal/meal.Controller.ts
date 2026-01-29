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

const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params!
        if (!id || Array.isArray(id)) {
            throw new Error("Id Required")
        }
        const userId = req.user?.id

        const profile = await prisma.providerProfile.findUnique({
            where: { id: userId! }
        });

        if (!profile) {
            throw new Error("Provider not found")
        }

        const result = await mealService.updateMealDB(id, profile?.id, req.body);
        res.status(200).json({ success: true, message: "Meal updated", data: result });
    } catch (error) { next(error); }
};

const deleteMeal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            throw new Error("Id Required")
        }
        const providerId = req.user?.id!;
        await mealService.deleteMealDB(id, providerId);
        res.status(200).json({ success: true, message: "Meal deleted" });
    } catch (error) { next(error); }
};


const getAllMeal = async (req: Request, res: Response, next: NextFunction) => {

    const filter = req.query

    try {
        const result = await mealService.getAllMealDB(filter)

        res.status(200).json({
            success: true,
            message: "All Meal Retrive",
            data: result.data,
           meta: result.meta
        });

    } catch (error: any) {
        next(error)
    }
}

const getMealById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const meal = await mealService.getMealByIdDB(id as string);

        if (!meal) {
            return res.status(404).json({
                success: false,
                message: "Meal not found!",
            });
        }

        res.status(200).json({
            success: true,
            message: "Meal details retrieved successfully",
            data: meal,
        });
    } catch (error) {
        next(error);
    }
};

export const mealController = {
    createMeal,
    updateMeal,
    deleteMeal,
    getAllMeal,
    getMealById
};