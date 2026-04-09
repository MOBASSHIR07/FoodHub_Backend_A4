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
  // origin: "https://food-hub-frontend-a4.vercel.app",  
   origin: [
    "http://localhost:5000",                          // ✅ local frontend
    "https://food-hub-frontend-a4.vercel.app",        // ✅ deployed frontend
  ],
  credentials: true,              
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.all('/api/auth/*any', toNodeHandler(auth));
app.use(express.json());



app.get('/get-session-token', (req, res) => {
  const cookieHeader = req.headers.cookie || '';
  const tokenMatch = cookieHeader.match(/__Secure-better-auth\.session_token=([^;]+)/);
  const token = tokenMatch ? tokenMatch[1] : null;
  res.json({ token });
});
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