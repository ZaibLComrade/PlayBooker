import type { Types } from "mongoose";
import type {isBooked} from "./booking.contant";

type IsBooked = typeof isBooked[number];

export interface IBooking {
	date: Date;
	startTime: string;
	endTime: string;
	user: Types.ObjectId;
	facility: Types.ObjectId;
	payableAmount: number;
	isBooked: IsBooked;
}


export interface Payload {
	date: string;
	startTime: string;
	endTime: string;
	user: string;
	facility: string;
	payableAmount: number;
	isBooked: IsBooked;
}
