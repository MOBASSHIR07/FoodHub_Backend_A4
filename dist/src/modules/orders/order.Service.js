import { prisma } from "../../lib/prisma.js";
const createOrderDB = async (customerId, payload) => {
    const orderNumber = `FH-${Math.floor(10000 + Math.random() * 9000)}`;
    return await prisma.$transaction(async (tx) => {
        let totalAmount = 0;
        const orderItemsData = [];
        let targetProviderId = null;
        for (const item of payload.items) {
            const meal = await tx.meal.findUnique({
                where: {
                    id: item.mealId
                }
            });
            if (!meal)
                throw new Error(`Meal with ID ${item.mealId} not found`);
            // --- THE PROVIDER GUARD ---
            // On the first item, we set the target provider
            if (!targetProviderId) {
                targetProviderId = meal.providerId;
            }
            else if (meal.providerId !== targetProviderId) {
                // If any following item belongs to a different provider, REJECT!
                throw new Error("You can only order from one restaurant at a time.");
            }
            // --------------------------
            totalAmount += meal.price * item.quantity;
            orderItemsData.push({
                mealId: item.mealId,
                quantity: item.quantity,
                price: meal.price
            });
        }
        return await tx.order.create({
            data: {
                orderNumber,
                totalAmount,
                deliveryAddress: payload.deliveryAddress,
                customerId,
                items: {
                    create: orderItemsData
                }
            },
            include: {
                items: true
            }
        });
    });
};
const updateOrderStatusDB = async (id, userId, status, role) => {
    // 1. Validate status existence
    const validStatuses = ["PENDING", "CONFIRMED", "COOKING", "DELIVERED", "CANCELLED"];
    if (!validStatuses.includes(status)) {
        throw new Error(`Invalid status: ${status}`);
    }
    // 2. Fetch the current order
    const order = await prisma.order.findUnique({
        where: { id },
        include: {
            items: {
                include: {
                    meal: {
                        include: {
                            provider: true
                        }
                    }
                }
            }
        }
    });
    if (!order)
        throw new Error("Order not found");
    const currentStatus = order.status;
    // 3. Prevent updates to terminal states
    if (currentStatus === "CANCELLED" || currentStatus === "DELIVERED") {
        throw new Error(`Cannot update order status. Current status is already ${currentStatus}.`);
    }
    // 4. Role-based logic
    if (role === "CUSTOMER") {
        if (order.customerId !== userId) {
            throw new Error("Unauthorized: This order does not belong to you.");
        }
        if (status !== "CANCELLED") {
            throw new Error("Invalid action: Customers can only cancel orders.");
        }
        if (currentStatus !== "PENDING") {
            throw new Error("You cannot cancel the order now (it is already confirmed or preparing)");
        }
    }
    else {
        // PROVIDER or ADMIN logic
        // Verify provider ownership (at least one item belongs to this provider)
        const isAuthorizedProvider = order.items.some(item => item.meal.provider.userId === userId);
        if (!isAuthorizedProvider && role !== "ADMIN") {
            throw new Error("Order not found or unauthorized");
        }
        // Enforce logical progression for non-cancel actions
        if (status !== "CANCELLED") {
            const statusMap = {
                "PENDING": ["CONFIRMED"],
                "CONFIRMED": ["COOKING"],
                "COOKING": ["DELIVERED"]
            };
            const allowedNextSteps = statusMap[currentStatus] || [];
            if (!allowedNextSteps.includes(status)) {
                throw new Error(`Invalid transition from ${currentStatus} to ${status}`);
            }
        }
        else {
            // If provider wants to cancel, it's generally allowed unless delivered (already checked terminal states)
        }
    }
    // 5. Update the status
    return await prisma.order.update({
        where: { id },
        data: { status }
    });
};
const getMyOrdersDB = async (customerId) => {
    const [orders, totalCount] = await prisma.$transaction([
        prisma.order.findMany({
            where: { customerId },
            include: {
                items: {
                    include: { meal: true }
                },
            },
            orderBy: { createdAt: 'desc' }
        }),
        prisma.order.count({
            where: { customerId }
        })
    ]);
    return {
        orders,
        totalCount
    };
};
const getOrderByIdDB = async (orderId, customerId) => {
    return await prisma.order.findUnique({
        where: {
            id: orderId,
            customerId: customerId
        },
        include: {
            items: {
                include: { meal: true }
            },
            _count: true
        }
    });
};
const getProviderOrdersDB = async (userId) => {
    return await prisma.order.findMany({
        where: {
            items: {
                some: {
                    meal: {
                        provider: {
                            userId: userId
                        }
                    }
                }
            }
        },
        include: {
            items: {
                include: {
                    meal: {
                        select: {
                            name: true,
                            image: true,
                            price: true
                        }
                    }
                }
            },
            customer: {
                select: {
                    name: true,
                    email: true,
                    phoneNumber: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
};
const getOrderTrackingDB = async (orderId, userId) => {
    return await prisma.order.findFirst({
        where: {
            id: orderId,
            customerId: userId
        },
        select: {
            id: true,
            status: true,
            updatedAt: true
        }
    });
};
export const orderService = {
    createOrderDB,
    updateOrderStatusDB,
    getMyOrdersDB,
    getOrderByIdDB,
    getProviderOrdersDB,
    getOrderTrackingDB
};
//# sourceMappingURL=order.Service.js.map