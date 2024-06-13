import type { RequestHandler } from "express";
import type { AnyZodObject } from "zod";
import catchAsync from "../utils/catchAsync";

type ValidateRequest = (schema: AnyZodObject) => RequestHandler;
export const validateRequest: ValidateRequest = (schema) => {
	return catchAsync(async (req, res, next) => {
		await schema.parseAsync(req.body);
		next();
	});
};
