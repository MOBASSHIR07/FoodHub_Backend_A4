
import { prisma } from "../../lib/prisma.js"

const createOrderDB = async (customerId: string, payload: any) => {
    const orderNumber = `FH-${Math.floor(10000 + Math.random() * 9000)}`

    return await prisma.$transaction(async (tx) => {
        let totalAmount = 0;
        const orderItemsData: any = [];
        let targetProviderId: string | null = null;
        for (const item of payload.items) {
            const meal = await tx.meal.findUnique(
                {
                    where: {
                        id: item.mealId
                    }
                }
            )
            if (!meal) throw new Error(`Meal with ID ${item.mealId} not found`);

            // --- THE PROVIDER GUARD ---
            // On the first item, we set the target provider
            if (!targetProviderId) {
                targetProviderId = meal.providerId;
            } else if (meal.providerId !== targetProviderId) {
                // If any following item belongs to a different provider, REJECT!
                throw new Error("You can only order from one restaurant at a time.");
            }
            // --------------------------
            totalAmount += meal.price * item.quantity
            orderItemsData.push({
                mealId: item.mealId,
                quantity: item.quantity,
                price: meal.price
            })
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
        })




    })


}

const updateOrderStatusDB = async (id: string, providerId: string, status: string) => {
 
    const order = await prisma.order.findFirst({
        where: {
            id,
            items: {
                some: {
                    meal: { provider: { userId: providerId } }
                }
            }
        }
    });

    if (!order) throw new Error("Order not found or unauthorized");

    
    return await prisma.order.update({
        where: { id },
        data: { status }
    });
};


const getMyOrdersDB = async (customerId: string) => {
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

const getOrderByIdDB = async (orderId: string, customerId: string) => {
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

const getProviderOrdersDB = async (userId: string) => {
    return await prisma.order.findMany({
        where: {
            items: {
                some: {  // table joining 
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



export const orderService = {
    createOrderDB,
    updateOrderStatusDB,
    getMyOrdersDB,
    getOrderByIdDB,
    getProviderOrdersDB
}