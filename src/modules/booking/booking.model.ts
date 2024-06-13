import { Schema, model } from "mongoose";
import type { IBooking } from "./booking.interface";
import { isBooked, timeRegex } from "./booking.contant";

// TODO: Add validator funcs for dates

const bookingSchema = new Schema<IBooking>({
	facility: {
		type: Schema.Types.ObjectId,
		required: [true, "Facility is required"],
		ref: "Facility",
	},
	date: {
		type: String,
		required: [true, "Date is required"],
	},
	startTime: {
		type: String,
		required: [true, "Start time is required"],
		match: [timeRegex, "Invalid start time"],
	},
	endTime: {
		type: String,
		required: [true, "End time is required"],
		match: [timeRegex, "Invalid end time"],
	},
	user: {
		type: Schema.Types.ObjectId,
		required: [true, "User is required"],
		ref: "User",
	},
	payableAmount: {
		type: Number,
		required: [true, "Payable amount is required"],
	},
	isBooked: {
		type: String,
		enum: isBooked,
		default: "confirmed",
	},
});

const Booking = model<IBooking>("Booking", bookingSchema);
export default Booking;
