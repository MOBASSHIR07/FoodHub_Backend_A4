import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { adminController } from "./admin.Controller.js";

const router = Router()

router.get('/users',authMiddleware("ADMIN"),adminController.getAllUsers  )
router.patch("/users/:id", authMiddleware("ADMIN"),adminController.updateStatus)

export const adminRoute = router