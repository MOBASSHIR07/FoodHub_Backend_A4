import { orderService } from "./order.Service.js";
const createOrder = async (req, res, next) => {
    try {
        const customerId = req.user?.id;
        const result = await orderService.createOrderDB(customerId, req.body);
        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
////////////////////////////////////////////////////////////////////////////////////
const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const providerId = req.user?.id;
        const role = req.user?.role;
        const result = await orderService.updateOrderStatusDB(id, providerId, status, role);
        res.status(200).json({ success: true, message: `Status changed to ${status}`, data: result });
    }
    catch (error) {
        next(error);
    }
};
/////////////////////////////////////////////////////////////////////////////////////////////
const getMyOrders = async (req, res, next) => {
    try {
        const customerId = req.user?.id;
        const result = await orderService.getMyOrdersDB(customerId);
        res.status(200).json({
            success: true,
            message: "Orders retrieved successfully",
            meta: {
                totalOrder: result.totalCount
            },
            data: result.orders
        });
    }
    catch (error) {
        next(error);
    }
};
const getOrderById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const customerId = req.user?.id;
        const result = await orderService.getOrderByIdDB(id, customerId);
        if (!result) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        const orderDetails = {
            ...result,
            total_item: result._count,
            _count: undefined,
        };
        res.status(200).json({
            success: true,
            message: "Order details retrieved",
            data: orderDetails
        });
    }
    catch (error) {
        next(error);
    }
};
const getProviderOrders = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId)
            throw new Error("Unauthorized access");
        const result = await orderService.getProviderOrdersDB(userId);
        res.status(200).json({
            success: true,
            message: "Incoming orders retrieved successfully",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
const trackOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        const result = await orderService.getOrderTrackingDB(id, userId);
        if (!result) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }
        res.status(200).json({
            success: true,
            message: "Order status retrieved",
            data: result
        });
    }
    catch (error) {
        next(error);
    }
};
export const orderController = {
    createOrder,
    updateOrderStatus,
    getMyOrders,
    getOrderById,
    getProviderOrders,
    trackOrder
};
//# sourceMappingURL=order.Controller.js.map