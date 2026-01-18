import express from 'express';
import cors from 'cors';
import  authRoute  from './modules/auth/auth.routes.js';
import errorHandler from './middleware/errorMiddleware.js';
import userRoutes from './modules/user/user.routes.js';
import cookieParser from 'cookie-parser';
import productRoutes from './modules/product/product.routes.js';
import orderRoutes from './modules/order/order.routes.js';





const app = express();


app.use(cors());

/**
 * STRIPE WEBHOOK NOTE: 
 * Stripe webhooks require the raw body to verify the signature. 
 * If you use express.json() globally, it will parse the body and the webhook will fail.
 * We will address this specifically when we build the Order module.
 */
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