import { getDB } from '../../config/db.js';
import bcrypt from 'bcryptjs';

/** @type {() => import('mongodb').Collection} */
const usersCollection = () => getDB().collection('users');

const registerUserDB = async (userInfo) => {

    const isExist = await usersCollection().findOne({ email: userInfo.email });
    if (isExist) {

        const error = new Error('User already exists');
        error.statusCode = 409;
        throw error;
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userInfo.password, salt);


    const newUser = {
        ...userInfo,
        password: hashedPassword,
        role: 'user',
        timestamp: Date.now()
    };


    const result = await usersCollection().insertOne(newUser);
    return {
        _id: result.insertedId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };
};





const loginUserDB = async (userInfo) => {

    const { email, password } = userInfo
    const user = await usersCollection().findOne({
        email: email
    })
    if (!user) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

};

export const authService = {
    registerUserDB,
    loginUserDB
};