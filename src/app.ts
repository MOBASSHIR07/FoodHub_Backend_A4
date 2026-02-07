import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { authRoute } from "./modules/auth/auth.Route.js";
import { adminRoute } from "./modules/admin/admin.Route.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";
import { orderRoute } from "./modules/orders/order.Route.js";
import { mealRoute } from "./modules/meal/meal.Route.js";
import { providerRoute } from "./modules/provider/provider.Route.js";
import { reviewRoute } from "./modules/review/review.Route.js";
import { customerRoute } from "./modules/customer/customer.Route.js";


const app = express();


app.use(cors({
  origin: "https://food-hub-frontend-a4.vercel.app",  
  credentials: true,              
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());


app.all('/api/auth/*any', toNodeHandler(auth));

app.get('/', (req, res) => {
    res.send("FoodHub Server is running 🍱");
});

app.use("/auth", authRoute)
app.use('/admin', adminRoute)
app.use('/order', orderRoute)
app.use('/meal', mealRoute)
app.use('/provider', providerRoute)
app.use('/review', reviewRoute)
app.use('/customer', customerRoute)

app.use(globalErrorHandler);
export default app;