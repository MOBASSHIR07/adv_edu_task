import Stripe from 'stripe';
import { getDB } from '../../config/db.js';
import { ObjectId } from 'mongodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const handleWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
       
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.client_reference_id;

        const db = getDB();
        await db.collection('orders').updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { status: 'paid', paymentStatus: 'completed', updatedAt: new Date() } }
        );
        console.log(`Payment success for order: ${orderId}`);
    }

    res.json({ received: true });
};

export const paymentController = {
    handleWebhook
};