import { ZodError } from "zod";
import { handleZodValidation } from "./handleZodValidation";
import type { ServerResponse } from "../@types";
import { Error } from "mongoose";
import { handleValidationError } from "./handleValidation";
import { handleCastError } from "./handleCastError";
import { handleDuplicateError } from "./handleDuplicateError";

interface ErrorHandler {
	check: (err: any) => boolean;
	handler: (err: any) => ServerResponse;
}

const errorHandler: ErrorHandler[] = [
	{ check: (err) => err instanceof ZodError, handler: handleZodValidation },
	{
		check: (err) => err instanceof Error.ValidationError,
		handler: handleValidationError,
	},
	{
		check: (err) => err instanceof Error.CastError,
		handler: handleCastError,
	},
	{ check: (err) => err.code === 11000, handler: handleDuplicateError },
];

export default errorHandler;
