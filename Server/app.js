import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import morgan from 'morgan';
import userRouter from './Routes/user.routes.js';
import errorMiddleware from './middleware/error.middleware.js';
import courseRoutes from './Routes/course.routes.js';
import paymentRoutes from './Routes/payment.route.js';

config();

const app = express();

// Pre Routes Made by The Express...................

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

// We will define the router in Router.user.js File and app.use("/api/v1/user") is basic and rest we will define in route ---------->
app.use('/api/v1/user', userRouter);

app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/payments',paymentRoutes)

app.use('/ping', (req, res) => {
    res.send('/pong');
});

// Routes for 3 Module

// If someone gives other than these 3 routes, then give an "Ooops !!! 404 page not found" error.
app.all('*', (req, res) => {
    res.status(404).send("Ooops !!! 404 page not found");
});

// If any Error COmming than We will go for middle ware where we defined the error...............>>>>>>>>>>>>
// If u r reaching here than u have done some Error----------------------->>>>>>>>>>>>>>>>>>>>>
app.use(errorMiddleware);

export default app;
