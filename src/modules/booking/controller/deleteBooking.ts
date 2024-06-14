import type { SearchQuery } from "../../../@types";
import ApiError from "../../../utils/ApiError";
import catchAsync from "../../../utils/catchAsync";
import { cancelBooking } from "../service";

export const deleteBooking = catchAsync(async (req, res, next) => {
	const query: SearchQuery = {
		user: req.user?._id,
		_id: req.params.id,
	};

	const data = await cancelBooking(query);
	if (data === null) throw new ApiError(404, "Data Not Found");
	data.__v = undefined;

	res.status(200).json({
		success: true,
		statusCode: 200,
		message: "Booking cancelled successfully",
		data,
	});
});
