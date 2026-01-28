import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { authController } from "./auth.Controller.js";

const  router = Router()

router.get("/me", authMiddleware("ADMIN", "PROVIDER", "CUSTOMER"),authController.getProfile )

export const authRoute  = router