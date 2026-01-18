import { orderService } from './order.service.js';

const createOrder = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id; 

        const result = await orderService.createOrderDB(userId, productId);

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getMyOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orders = await orderService.getMyOrdersDB(userId);
        
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        next(error);
    }
};

export const orderController = {
    createOrder,
    getMyOrders
};