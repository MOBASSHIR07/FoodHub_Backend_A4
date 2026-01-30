import { Router } from "express";
import { orderController } from "./order.Controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = Router()
router.post("/create", authMiddleware("CUSTOMER"), orderController.createOrder)
router.patch("/status/:id", authMiddleware("PROVIDER"), orderController.updateOrderStatus);
router.get('/providers-order', authMiddleware("PROVIDER"), orderController.getProviderOrders)

router.get('/track/:id', authMiddleware("CUSTOMER"), orderController.trackOrder);

router.get("/", authMiddleware("CUSTOMER"), orderController.getMyOrders);
router.get("/:id", authMiddleware("CUSTOMER"), orderController.getOrderById);

export const orderRoute = router