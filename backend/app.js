import express from "express";
import cors from "cors";
import allRouter from "./ApiV1/apiV1.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();



// CORS: allow the frontend to call the backend in dev.
// In production you'd lock this down to your deployed domain(s).
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routing
app.use("/api/v1", allRouter);

// Health check (useful for deployment smoke tests).
app.get("/health", (req, res) => res.json({ ok: true }));

// Error handler must be last.
app.use(errorHandler);

export default app;