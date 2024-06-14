import type { ErrorHandler } from "../@types";

export const handleDuplicateError: ErrorHandler<any> = (err) => {
	const errorMessages = [];

	for (const [key, value] of Object.entries(err?.keyValue as object)) {
		errorMessages.push({
			path: key,
			message: `${value as string} already exists`,
		});
	}

	return {
		success: false,
		statusCode: 400,
		message: err.message,
		errorMessages,
	};
};
