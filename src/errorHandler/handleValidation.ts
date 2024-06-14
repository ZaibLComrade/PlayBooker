import type { Error } from "mongoose";
import type { ErrorHandler } from "../@types";

export const handleValidationError: ErrorHandler<Error.ValidationError> = (
	err
) => {
	const { errors } = err;
	const errorMessages = Object.values(errors).map((val) => {
		return {
			path: val?.path,
			message: val?.message,
		};
	});

	return {
		success: false,
		statusCode: 400,
		message: "Validation Error",
		errorMessages,
	};
};
