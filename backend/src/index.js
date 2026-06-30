import dotenv from "dotenv";
dotenv.config();

import express from "express";
import middlewareHandler from "../middlewares/middlewareHandler.js";
import authRoutes from "../routes/auth.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Apply middlewares
middlewareHandler(app);

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/api/health", (req, res) => {
	res.json({ message: "Server is running" });
});

// error handler
app.use((req, res, next) => {
	res.status(404).json({ success: false, message: "Page not found" });
});

app.use((error, req, res, next) => {
	console.error(error);
	res.status(500).json({ success: false, error: error.message });
});

// Start Server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
