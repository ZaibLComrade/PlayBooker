import type { DeleteDoc } from "../../../@types";
import type { IBooking } from "../booking.interface";
import Booking from "../booking.model";

export const cancelBooking: DeleteDoc<IBooking> = async (query) => {
	return await Booking.findOneAndUpdate(
		query,
		{ isBooked: "cancelled" },
		{ new: true }
	).populate("facility", "-__v");
};
