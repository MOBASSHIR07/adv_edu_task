import { getDB } from '../../config/db.js';
import { ObjectId } from 'mongodb';

/** @type {() => import('mongodb').Collection} */
const ordersCollection = () => getDB().collection('orders');
const productsCollection = () => getDB().collection('products');

const createOrderDB = async (userId, productId) => {
   
    const product = await productsCollection().findOne({ _id: new ObjectId(productId) });
    
    if (!product) {
        const error = new Error("Product not found");
        error.statusCode = 404;
        throw error;
    }

    const newOrder = {
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
        productName: product.name,
        amount: product.price,
        status: 'pending',
        paymentStatus: 'unpaid',
        createdAt: new Date(),
    };

    const result = await ordersCollection().insertOne(newOrder);
    
    return {
        orderId: result.insertedId,
        product
    };
};

const getMyOrdersDB = async (userId) => {
    return await ordersCollection().find({ userId: new ObjectId(userId) }).toArray();
};

export const orderService = {
    createOrderDB,
    getMyOrdersDB
};