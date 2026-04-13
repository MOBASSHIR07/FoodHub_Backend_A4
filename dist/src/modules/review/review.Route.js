import { Router } from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { reviewController } from "./review.Controller.js";
const router = Router();
router.post("/add", authMiddleware("CUSTOMER"), reviewController.createReview);
export const reviewRoute = router;
//# sourceMappingURL=review.Route.js.map