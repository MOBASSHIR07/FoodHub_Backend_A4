import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { customerController } from "./customer.Controller.js";


const router = express.Router();


router.put("/update-profile",   authMiddleware("CUSTOMER"),  customerController.updateProfile);

export const customerRoute = router;