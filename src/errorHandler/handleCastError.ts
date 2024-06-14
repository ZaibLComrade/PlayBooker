import type { Error } from "mongoose";
import type { ErrorHandler } from "../@types";

export const handleCastError: ErrorHandler<Error.CastError> = (err) => {
	const errorMessages = [
		{
			path: err?.path,
			message: err?.message,
		},
	];

	return {
		success: false,
		statusCode: 400,
		message: "Cast Error",
		errorMessages,
	};
};
