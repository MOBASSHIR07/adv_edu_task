import { userService } from './user.service.js';

const getMyProfile = async (req, res, next) => {
    try {
        
        const userId = req.user.id; 

        const result = await userService.getUserProfileFromDB(userId);

        res.status(200).json({
            success: true,
            message: "User profile retrieved successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

export const userController = {
    getMyProfile
};