import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (orderData, userEmail) => {
    return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        customer_email: userEmail,
        client_reference_id: orderData.orderId.toString(), 
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: orderData.productName,
                    },
                    unit_amount: Math.round(orderData.amount * 100), 
                },
                quantity: 1,
            },
        ],
        success_url: `${process.env.CLIENT_URL}/success?id=${orderData.orderId}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });
};

export const paymentService = {
    createCheckoutSession
};