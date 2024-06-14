import type { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import { loginService } from "../auth.service";
import type { Payload } from "../auth.interface";
import config from "../../../config";
import ApiError from "../../../utils/ApiError";

export const login: RequestHandler = catchAsync(async (req, res) => {
	const payload: Payload = req.body;
	const { accessToken, user, refreshToken } = await loginService(payload);
	res.cookie("refreshToken", refreshToken, {
		secure: config.isRemote,
		httpOnly: true,
	});
	if (user === null) throw new ApiError(404, "Data Not Found");

	user.password = undefined;
	user.__v = undefined;

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "User logged in successfully",
		token: accessToken,
		data: user,
	});
});
