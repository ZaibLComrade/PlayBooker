import type { FetchDoc } from "../../../@types";
import type { IBooking } from "../booking.interface";
import Booking from "../booking.model";

export const fetchBooking: FetchDoc<IBooking> = async (query) => {
	return await Booking.find(query, { __v: 0 }).populate("facility", "-__v");
};
