import { authService } from "./auth.service.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
    try {
        const userInfo = req.body;


        if (!userInfo.email || !userInfo.password) {
            const error = new Error("A required field is missing.");
            error.statusCode = 400;
            throw error;
        }

        const result = await authService.registerUserDB(userInfo);
        res.status(201).send({ success: true, data: result });

    } catch (error) {

        next(error);
    }
};


const loginUser = async (req, res, next) => {

    try {

        const userInfo = req.body;
        if (!userInfo.email || !userInfo.password) {
            const error = new Error("A required field is missing.");
            error.statusCode = 400;
            throw error;
        }

        const user = await authService.loginUserDB(userInfo)

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.cookie('token', token, {
            httpOnly: true,
            // secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

    
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: user, 
            token 
        });

    } catch (error) {
        next(error)
    }

};

export const authController = {
    registerUser,
    loginUser
};