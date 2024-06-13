import { Schema, model } from "mongoose";
import type { Model } from "mongoose";
import type { IUser } from "./user.interface";
import { role } from "./user.contant";
import bcrypt from "bcrypt";
import config from "../../config";

interface UserModel extends Model<IUser> {
	doesPassMatch: (password: string, hashed: string) => Promise<boolean>;
}

interface SchemaIUser extends IUser {
	password: string;
}
const userSchema = new Schema<SchemaIUser, UserModel>({
	name: {
		type: String,
		required: [true, "Name is required"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		select: false,
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
		enum: role,
	},
	address: {
		type: String,
		required: [true, "Address is required"],
	},
});

userSchema.static("doesPassMatch", async (
	password: string,
	hashed: string
) => {
	return await bcrypt.compare(password, hashed);
});

userSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, config.hash_salt);
	next();
});

const User = model<SchemaIUser, UserModel>("User", userSchema);
export default User;
