import type { CreateDoc } from "../../@types";
import type { IUser } from "./user.interface";
import User from "./user.model";

export const createUser: CreateDoc<IUser> = async (payload) => {
	return await User.create(payload);
};
