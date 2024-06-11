import express from "express";
import type { Express } from "express";

const app: Express = express();

app.use(express.json());

app.all("/", async (req, res) => {
	res.status(200).json({
		message: "Server is running",
	});
});

export default app;
