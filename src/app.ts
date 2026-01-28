import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import { authRoute } from "./modules/auth/auth.Route.js";
import { adminRoute } from "./modules/admin/admin.Route.js";
import globalErrorHandler from "./middleware/globalErrorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());


app.all('/api/auth/*any', toNodeHandler(auth));

app.get('/', (req, res) => {
    res.send("FoodHub Server is running 🍱");
});

app.use("/auth", authRoute)
app.use('/admin', adminRoute)

app.use(globalErrorHandler);
export default app;