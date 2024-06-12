import { Schema, model } from "mongoose";
import type { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
		match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
	},
	phone: {
		type: String,
		required: [true, "Phone number is required"],
	},
	role: {
		type: String,
		required: [true, "Role is required"],
		enum: ["admin", "user"],
	},
	address: {
		type: String,
		required: [true, "Address is required"],
	},
});

const User = model<IUser>("User", userSchema);
export default User;
