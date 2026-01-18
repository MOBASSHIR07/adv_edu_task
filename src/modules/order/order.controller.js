import { orderService } from './order.service.js';
import { paymentService } from '../payment/payment.service.js';

const createOrder = async (req, res, next) => {
    try {
        const { productId } = req.body;
        const { id: userId, email: userEmail } = req.user; 

        const { orderId, product } = await orderService.createOrderDB(userId, productId);

       
        const orderData = {
            orderId,
            productName: product.name,
            amount: product.price
        };
        const session = await paymentService.createCheckoutSession(orderData, userEmail);

        res.status(201).json({
            success: true,
            message: "Order placed. Redirect to payment.",
            data: {
                orderId,
                paymentUrl: session.url 
            }
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