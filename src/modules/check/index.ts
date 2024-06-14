import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import type { SearchQuery } from "../../@types";
import { getDate } from "./utils";
import Booking from "../booking/booking.model";
import ApiError from "../../utils/ApiError";

const checkRouter = Router();

checkRouter.get(
	"/",
	catchAsync(async (req, res, next) => {
		const date = getDate(req?.query?.date as string);
		const dateQuery: SearchQuery = {
			date,
		};

		const data = await Booking.find(dateQuery, {
			startTime: 1,
			endTime: 1,
			_id: 0,
		});

		if (data === null || data.length === 0)
			throw new ApiError(404, "No Data Found");

		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Availability checked successfully",
			data,
		});
	})
);

export default checkRouter;
