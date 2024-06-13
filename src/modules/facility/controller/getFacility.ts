import type { RequestHandler } from "express";
import type { SearchQuery } from "../../../@types";
import ApiError from "../../../utils/ApiError";
import catchAsync from "../../../utils/catchAsync";
import { fetchFacility } from "../service/fetchFacility";

export const getFacility: RequestHandler = catchAsync(
	async (req, res, next) => {
		const id = req.params.id ?? "";
		const query: SearchQuery = {};
		if (id !== "") query._id = id;

		const data = await fetchFacility(query);
		if (data === null) throw new ApiError(404, "Data Not Found");

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Facilities retrieved successfully",
			data,
		});
	}
);
