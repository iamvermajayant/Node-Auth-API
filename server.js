import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";
import { errorHandler } from "./src/middleware/errorHandler.js";


dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;


// DB
connectDB();


// Middleware
app.use(helmet());
app.use(express.json());
app.use(cors());


const limiter = rateLimit({
windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
max: Number(process.env.RATE_LIMIT_MAX) || 100,
standardHeaders: true,
legacyHeaders: false,
});
app.use(limiter);


// Routes
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => res.json({ status: "ok", message: "Auth API running" }));


// Error Handler
app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));