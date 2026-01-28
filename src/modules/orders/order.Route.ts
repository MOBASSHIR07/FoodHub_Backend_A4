import { Router } from "express";
import { orderController } from "./order.Controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router()
router.post("/create", authMiddleware("CUSTOMER"), orderController.createOrder)

export const orderRoute = router