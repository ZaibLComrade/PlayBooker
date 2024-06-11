import type { ErrorRequestHandler } from "express";
import { ServerResponse } from "../@types";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const error: ServerResponse = {
		success: false,
		statusCode: err?.statusCode ?? 500,
		message: err?.message ?? "Something went wrong",
		errorSources: err?.errorsources ?? [],
		stack: err?.stack ?? "",
	};

	res.status(error.statusCode).json(error);
	next();
};

export default globalErrorHandler;
