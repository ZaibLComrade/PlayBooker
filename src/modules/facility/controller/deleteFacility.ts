import type { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import type { SearchQuery } from "../../../@types";
import { removeFacility } from "../service";
import ApiError from "../../../utils/ApiError";

export const deleteFacility: RequestHandler = catchAsync(async (req, res) => {
	const id = req.params.id ?? "";
	const query: SearchQuery = {};
	if (id !== "") query._id = id;

	const data = await removeFacility(query);
	if (data === null) throw new ApiError(404, "Data Not Found");
	data.__v = undefined;

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Facility deleted successfully",
		data,
	});
});
