import { prisma } from "../../lib/prisma.js";
const createReviewDB = async (userId, mealId, rating, comment) => {
    const hasOrdered = await prisma.order.findFirst({
        where: {
            customerId: userId,
            status: "DELIVERED",
            items: {
                some: { mealId: mealId }
            }
        }
    });
    if (!hasOrdered) {
        throw new Error("You can only review meals you have successfully ordered and received.");
    }
    const existingReview = await prisma.review.findFirst({
        where: { customerId: userId, mealId: mealId }
    });
    if (existingReview) {
        throw new Error("You have already reviewed this meal.");
    }
    return await prisma.review.create({
        data: {
            rating,
            comment: comment ?? null,
            customerId: userId,
            mealId: mealId
        }
    });
};
export const reviewService = {
    createReviewDB
};
//# sourceMappingURL=review.Service.js.map