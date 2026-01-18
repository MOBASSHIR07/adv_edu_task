import jwt from 'jsonwebtoken';

const authMiddleware = (...roles) => {
    return (req, res, next) => {
        try {
           
            const token = req.cookies.token;

            if (!token) {
                const error = new Error("Authentication required. Please login.");
                error.statusCode = 401;
                throw error;
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
          
            req.user = decoded; 

      
            if (roles.length && !roles.includes(decoded.role)) {
                const error = new Error("Forbidden: You do not have the required role.");
                error.statusCode = 403;
                throw error;
            }

            
            if (decoded.role === 'user' && req.params.userId) {
                if (decoded.id !== req.params.userId) {
                    const error = new Error("Unauthorized: You cannot access another user's profile.");
                    error.statusCode = 403;
                    throw error;
                }
            }

            next();
        } catch (err) {
            
            next(err);
        }
    };
};

export default authMiddleware;