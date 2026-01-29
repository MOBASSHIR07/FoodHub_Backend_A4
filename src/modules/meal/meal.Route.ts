import { Router } from "express";
import { mealController } from "./meal.Controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router();


router.post("/add-meal", authMiddleware("PROVIDER"), mealController.createMeal);
router.put("/update/:id", authMiddleware("PROVIDER"), mealController.updateMeal);
router.delete("/delete/:id", authMiddleware("PROVIDER"), mealController.deleteMeal);
router.get("/all-meal", authMiddleware("CUSTOMER"), mealController.getAllMeal)

export const mealRoute = router;