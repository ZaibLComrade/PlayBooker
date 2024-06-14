import catchAsync from "../../../utils/catchAsync";
import type { RequestHandler } from "express";
import { createFacility } from "../service";
import ApiError from "../../../utils/ApiError";
import type { IFacility } from "../facility.interface";

export const postFacility: RequestHandler = catchAsync(async (req, res) => {
	const payload: IFacility = req.body;
	const data = await createFacility(payload);

	if (data === null) throw new ApiError(400, "Failed to create facility");
	data.__v = undefined;

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Facility added successfully",
		data,
	});
});
