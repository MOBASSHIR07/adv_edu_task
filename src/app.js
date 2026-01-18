import express from 'express';
import cors from 'cors';
import  authRoute  from './modules/auth/auth.routes.js';
import errorHandler from './middleware/errorMiddleware.js';
import userRoutes from './modules/user/user.routes.js';
import cookieParser from 'cookie-parser';
import productRoutes from './modules/product/product.routes.js';
import orderRoutes from './modules/order/order.routes.js';
import paymentRoutes from './modules/payment/payment.routes.js';





const app = express();



app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use('/api/payment', express.raw({ type: 'application/json' }), paymentRoutes);
app.use(express.json()); 
app.use(cookieParser());


app.get('/', (req, res) => {
  res.status(200).json({ message: "API is healthy and running" });
});

app.use("/auth", authRoute)
app.use("/users", userRoutes)
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use(errorHandler);


export default app;