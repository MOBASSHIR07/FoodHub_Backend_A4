import { Router } from "express";
import { mealController } from "./meal.Controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();


router.post("/add-meal", authMiddleware("PROVIDER"), mealController.createMeal);

export const mealRoute = router;