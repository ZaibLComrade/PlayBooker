import type { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import type { IBooking } from "../booking.interface";
import { createBooking } from "../service";
import ApiError from "../../../utils/ApiError";

export const postBooking: RequestHandler = catchAsync(async (req, res) => {
	const user = req.user;
	const payload: IBooking = {
		...req.body,
		user: user?._id,
	};

	const data = await createBooking(payload);
	if (data === null) throw new ApiError(400, "Failed to create booking");
	data.__v = undefined;

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Booking created successfully",
		data,
	});
});
