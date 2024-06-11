import express from "express";
import type { Express } from "express";
import router from "./routes";

const app: Express = express();

app.use(express.json());

app.use("/api", router)

app.all("/", async (req, res) => {
	res.status(200).json({
		message: "Server is running",
	});
});

export default app;
