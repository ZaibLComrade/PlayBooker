import type { IFacility } from "./facility.interface";
import { Schema, model } from "mongoose";

const facilitySchema = new Schema<IFacility>({
	name: {
		type: String,
		required: [true, "Facility name is required"],
	},
	description: {
		type: String,
		required: [true, "A brief description is required"],
	},
	pricePerHour: {
		type: Number,
		required: [true, "Price per hour is required"],
	},
	location: {
		type: String,
		required: [true, "Location is required"],
	},
	isDeleted: {
		type: Boolean,
		default: false,
	}
})

const Facility = model<IFacility>("Facility", facilitySchema);
export default Facility;
