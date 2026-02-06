import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { adminController } from "./admin.Controller.js";

const router = Router()

router.get('/users',authMiddleware("ADMIN"),adminController.getAllUsers  )
router.patch("/users/:id", authMiddleware("ADMIN"),adminController.updateStatus)

// --- Category Management ---
router.post("/categories", authMiddleware("ADMIN"), adminController.createCategory);
router.get("/orders", authMiddleware("ADMIN"), adminController.getAllOrders)
router.get("/categories", authMiddleware("ADMIN", "PROVIDER"), adminController.getAllCategories);
router.patch("/categories/:id", authMiddleware("ADMIN"), adminController.updateCategory);
router.delete("/categories/:id", authMiddleware("ADMIN"), adminController.deleteCategory);

export const adminRoute = router