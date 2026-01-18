import { getDB } from '../../config/db.js';
import { ObjectId } from 'mongodb';

/** @type {() => import('mongodb').Collection} */
const productsCollection = () => getDB().collection('products');

const createProductDB = async (productData) => {
    const result = await productsCollection().insertOne({
        ...productData,
        createdAt: new Date()
    });
    return result;
};

const getAllProductsDB = async () => {
    return await productsCollection().find({}).toArray();
};

export const productService = {
    createProductDB,
    getAllProductsDB
};