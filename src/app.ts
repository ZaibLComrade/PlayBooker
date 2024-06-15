import express from "express";
import type { Express } from "express";
import router from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";
import cors from "cors";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Main route
app.use("/api", router);

// Checks server
app.all("/health", (req, res) => {
	res.status(200).json({
		message: "Server is running",
	});
});

app.all("*", (req, res) => {
	res.status(404).json({
		success: false,
		statusCode: 404,
		message: "Not Found",
	});
});

app.use(globalErrorHandler);

export default app;
