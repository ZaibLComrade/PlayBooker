import { z } from "zod";
import { getTimeArr } from "./booking.utils";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
export const createBookingSchema = z
	.object({
		facility: z.string().regex(/^[0-9a-fA-F]{24}$/, {
			message: "Invalid ObjectId",
		}),
		date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
			message: "Invalid date format. Expected YYYY-MM-DD",
		}),
		startTime: z.string().regex(timeRegex, {
			message: "Invalid date format. Expected: HH:MM",
		}),
		endTime: z.string().regex(timeRegex, {
			message: "Invalid date format. Expected HH:MM",
		}),
	})
	.refine(
		({ startTime, endTime }) => {
			const [startHour, startMinute] = getTimeArr(startTime);
			const [endHour, endMinute] = getTimeArr(endTime);

			// Checks if start time is not ahead of end time
			return !(
				startHour > endHour ||
				(startHour === endHour && startMinute > endMinute)
			);
		},
		{ message: "Invalid time. Start time is ahead of end time" }
	);
