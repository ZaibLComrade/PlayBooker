import type {RequestHandler} from "express";
import catchAsync from "../../../utils/catchAsync";
import {loginService} from "../auth.service";
import type {Payload} from "../auth.interface";
import config from "../../../config";

export const login: RequestHandler = catchAsync(
	async (req, res) => {
		const payload: Payload = req.body;
		const { accessToken, userData, refreshToken } = await loginService(payload)
		res.cookie("refreshToken", refreshToken, {
			secure: config.isRemote,
			httpOnly: true
		})
		
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "User logged in successfully",
			token: accessToken,
			data: userData,
		})
	}
)
