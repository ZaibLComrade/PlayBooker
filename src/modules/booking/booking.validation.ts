import { z } from "zod";
import { getTimeArr } from "./booking.utils";
import { timeRegex } from "./booking.contant";

const bookingSchema = z.object({
	facility: z.string().regex(/^[0-9a-fA-F]{24}$/, {
		message: "Invalid ObjectId",
	}),
	date: z
		.string()
		.regex(/^(?:\d{4})-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])$/, {
			message: "Invalid date format. Expected YYYY-MM-DD",
		}),
	startTime: z.string().regex(timeRegex, {
		message: "Invalid date format. Expected: HH:MM",
	}),
	endTime: z.string().regex(timeRegex, {
		message: "Invalid date format. Expected HH:MM",
	}),
});

export const createBookingSchema = bookingSchema.refine(
	({ startTime, endTime }) => {
		const [startHour, startMinute] = getTimeArr(startTime);
		const [endHour, endMinute] = getTimeArr(endTime);

		// Checks if start time is not ahead of end time
		return !(
			startHour > endHour ||
			startHour === endHour ||
			startMinute > endMinute
		);
	},
	{ message: "Invalid time. End time must be ahead of start time" }
);
