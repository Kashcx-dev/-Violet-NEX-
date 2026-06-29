import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

export default function middlewareHandler(app) {
	app.use(
		cors({
			origin: process.env.FRONTEND_URL || "http://localhost:5173",
			credentials: true,
			allowedHeaders: ["Content-Type", "Authorization"],
			methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
		})
	);
	app.use(express.json());
}

