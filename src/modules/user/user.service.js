import { getDB } from '../../config/db.js';
import { ObjectId } from 'mongodb';

/** @type {() => import('mongodb').Collection} */
const usersCollection = () => getDB().collection('users');

const getUserProfileFromDB = async (userId) => {
    
    const user = await usersCollection().findOne(
        { _id: new ObjectId(userId) },
        { projection: { password: 0 } }
    );

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return user;
};

export const userService = {
    getUserProfileFromDB
};