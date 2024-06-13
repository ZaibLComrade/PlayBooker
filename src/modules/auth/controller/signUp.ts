import type { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import type { IUser } from "../../user";
import { createUser } from "../../user";
import ApiError from "../../../utils/ApiError";

export const signUp: RequestHandler = catchAsync(async (req, res, next) => {
	const payload: IUser = req.body;
	const data = await createUser(payload);
	if (data === null) throw new ApiError(400, "Failed to register user");
	data.password = undefined;
	data.__v = undefined;

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "User registered successfully",
		data,
	});
});
