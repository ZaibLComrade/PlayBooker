import type { ErrorRequestHandler } from "express";
import { type ServerResponse } from "../@types";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	const error: ServerResponse = {
		success: false,
		statusCode: err?.statusCode ?? 500,
		message: err?.message ?? "Something went wrong",
		errorSources: err?.errorsources ?? [],
		stack: err?.stack ?? "",
	};
	
	console.log(err);

	res.status(error.statusCode).json(error);
	next();
};

export default globalErrorHandler;
