import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.Service.js";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
       
        const customerId = req.user?.id!; 
        
        const result = await orderService.createOrderDB(customerId, req.body);

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            data: result
        });
    } catch (error: any) {
        next(error);
    }
};
const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const providerId = req.user?.id!
        const result = await orderService.updateOrderStatusDB(id as string, providerId, status);
        res.status(200).json({ success: true, message: `Status changed to ${status}`, data: result });
    } catch (error) { next(error); }
};


export const orderController = {
    createOrder,
    updateOrderStatus
};