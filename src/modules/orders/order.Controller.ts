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

export const orderController = {
    createOrder
};