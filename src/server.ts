import type { Server } from "http";
import app from "./app";
import config from "./config";
import { connect } from "mongoose";
/* eslint-disable no-console */

let server: Server;

type Main = () => Promise<void>;

// Connects to database and starts server
const main: Main = async () => {
	try {
		await connect(config.db_uri, { dbName: config.db_name });
		console.info(
			`==== Connected to ${config.isDevMode ? "Compass" : "MongoDB"} ====`
		);
		server = app.listen(config.port, () => {
			console.log(`Server is listening to port ${config.port}`);
		});
	} catch (err) {
		console.error(err);
	}
};
main().catch(() => {});

// Shut down server on unexpected event;
process.on("unhandledRejection", () => {
	console.log("Unhadled rejection detected. Shutting down...");
	if (server !== undefined) {
		server.close(() => {
			process.exit(1);
		});
	}
	process.exit(1);
});

process.on("uncaughtException", () => {
	console.log("Uncaught exception detected. Shutting down...");
	process.exit(1);
});
