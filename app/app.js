import express from "express";
import * as dotenv from 'dotenv';
dotenv.config();
import dbConnect from "../config/dbConnect.js";
import userRoutes from "../routes/usersRoute.js";
import { globalErrHandler, notFound } from "../middlewares/globalErrHandler.js";
import productRouter from "../routes/prouctsRoute.js";
import categoryRouter from "../routes/categoriesRoute.js";
import brandRouter from "../routes/brandsRoute.js";
import colorRouter from "../routes/colorsRoute.js";
import reviewRouter from "../routes/reviewsRoute.js";
import orderRouter from "../routes/ordersRoute.js";

dbConnect();

const app = express();

app.use(express.json());

//routes
app.use('/api/v1/users/', userRoutes);
app.use('/api/v1/products/', productRouter);
app.use('/api/v1/categories/', categoryRouter);
app.use('/api/v1/brands/', brandRouter);
app.use('/api/v1/colors/', colorRouter);
app.use('/api/v1/reviews/', reviewRouter);
app.use('/api/v1/orders/', orderRouter);

app.use(globalErrHandler);
app.use(notFound);

export default app;