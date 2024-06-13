import type { RequestHandler } from "express";
import catchAsync from "../../../utils/catchAsync";
import type { IFacility } from "../facility.interface";
import { updateFacility } from "../service";
import type { SearchQuery } from "../../../@types";
import ApiError from "../../../utils/ApiError";

export const putFacility: RequestHandler = catchAsync(async (req, res) => {
	const id = req.params.id ?? "";
	const payload: IFacility = req.body;

	const query: SearchQuery = {};
	if (id !== "") query._id = id;

	const data = await updateFacility(query, payload);
	if (data === null) throw new ApiError(404, "Data Not Found");
	data.__v = undefined;

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Facility updated successfully",
		data,
	});
});
