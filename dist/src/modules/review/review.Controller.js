import { reviewService } from "./review.Service.js";
const createReview = async (req, res, next) => {
    try {
        const { mealId, rating, comment } = req.body;
        const userId = req.user?.id;
        const result = await reviewService.createReviewDB(userId, mealId, rating, comment);
        res.status(201).json({
            success: true,
            message: "Review submitted successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
export const reviewController = {
    createReview
};
//# sourceMappingURL=review.Controller.js.map