import type { ZodError } from "zod";
import type { ErrorHandler } from "../@types";

export const handleZodValidation: ErrorHandler<ZodError> = (err) => {
	const errorMessages = err.issues.map((issue) => {
		return {
			path: issue?.path[issue.path.length - 1],
			message: issue?.message,
		};
	});

	return {
		success: false,
		statusCode: 400,
		message: "Validation Error",
		errorMessages,
	};
};
