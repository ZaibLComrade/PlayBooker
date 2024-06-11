import express from "express";
import type { Express } from "express";
import router from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Express = express();

app.use(express.json());

app.use("/api", router)

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
	})
})

app.use(globalErrorHandler);

export default app;
