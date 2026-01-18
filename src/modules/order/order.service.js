import { getDB } from '../../config/db.js';
import { ObjectId } from 'mongodb';

/** @type {() => import('mongodb').Collection} */
const ordersCollection = () => getDB().collection('orders');
const productsCollection = () => getDB().collection('products');

const createOrderDB = async (userId, productId) => {
    const db = getDB();
    const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
    
    if (!product) throw new Error("Product not found");

    const newOrder = {
        userId: new ObjectId(userId),
        productId: new ObjectId(productId),
        productName: product.name,
        amount: product.price,
        status: 'pending', // শুরুতে পেন্ডিং থাকবে
        createdAt: new Date()
    };

    const result = await db.collection('orders').insertOne(newOrder);
    return { orderId: result.insertedId, product };
};




const getMyOrdersDB = async (userId) => {
    return await ordersCollection().find({ userId: new ObjectId(userId) }).toArray();
};

export const orderService = {
    createOrderDB,
    getMyOrdersDB
};