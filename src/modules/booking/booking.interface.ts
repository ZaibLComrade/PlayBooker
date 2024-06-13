import type { Types } from "mongoose";
import type {isBooked} from "./booking.contant";

type IsBooked = typeof isBooked[number];

export interface IBooking {
	_id?: Types.ObjectId;
	__v?: number;
	date: string;
	startTime: string;
	endTime: string;
	user?: Types.ObjectId;
	facility: Types.ObjectId;
	payableAmount?: number;
	isBooked?: IsBooked;
}
