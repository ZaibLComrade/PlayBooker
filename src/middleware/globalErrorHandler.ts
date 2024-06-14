import type { ErrorRequestHandler } from "express";
import type { ServerResponse } from "../@types";
import errorHandler from "../errorHandler";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const error: ServerResponse = {
		success: false,
		statusCode: err?.statusCode ?? 500,
		message: err?.message ?? "Something went wrong",
		errorMessages: err?.errorsMessages ?? [],
		stack: err?.stack ?? "",
	};

	errorHandler.forEach(({ check, handler }) => {
		if (check(err)) Object.assign(error, handler(err));
	});

	res.status(error.statusCode).json(error);
	next();
};

export default globalErrorHandler;
