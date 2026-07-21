import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import noteRoutes from "./src/routes/noteRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import dbConnection from "./src/config/db.js";

dotenv.config();

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN ?? "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
  }),
);
app.use(express.json());
app.use(authRoutes);
app.use(noteRoutes);

const PORT = process.env.PORT || 3001;

dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
  });
});
