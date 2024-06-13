import type { CreateDoc } from "../../../@types";
import ApiError from "../../../utils/ApiError";
import Facility from "../../facility/facility.model";
import type { IBooking } from "../booking.interface";
import Booking from "../booking.model";
import { getPayableAmount } from "../booking.utils";

export const createBooking: CreateDoc<IBooking> = async (payload) => {
	const { facility, startTime, endTime } = payload;
	const facilityDoc = await Facility.findOne(
		{ _id: facility },
		{ pricePerHour: 1 }
	).lean();

	if (facilityDoc === null) throw new ApiError(400, "Invalid facility");
	payload.payableAmount = getPayableAmount(
		startTime,
		endTime,
		facilityDoc.pricePerHour
	);
	return await Booking.create(payload);
};
