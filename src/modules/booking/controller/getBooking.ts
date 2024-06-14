import type {SearchQuery} from "../../../@types";
import ApiError from "../../../utils/ApiError";
import catchAsync from "../../../utils/catchAsync";
import {fetchBooking} from "../service";

export const getBooking = catchAsync(
	async(req, res, next) => {
		const user = req?.user?._id;
		const query: SearchQuery = { user };
		
		const data = await fetchBooking(query);
		if(data === null || data.length === 0) throw new ApiError(404, "No Data Found");
		res.status(200).json({
			success: true,
			statusCode: 200,
			message: "Bookings retrieved successfully",
			data,
		})
	}
)
