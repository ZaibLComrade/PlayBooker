import config from "../../config";
import ApiError from "../../utils/ApiError";
import User from "../user/user.model";
import type { Payload } from "./auth.interface";
import { createToken } from "./auth.utils";

type LoginService = (payload: Payload) => Promise<Record<string, unknown>>;
export const loginService: LoginService = async (payload) => {
	const user = await User.findOne({ email: payload.email }).select(
		"+password"
	);
	if (user === null) throw new ApiError(404, "No Data Found");

	const { password, ...userData } = user;
	const match = await User.doesPassMatch(payload.password, password ?? "");
	if (!match) throw new ApiError(403, "Invalid Password");

	const jwtPayload = {
		_id: user._id,
		role: user.role,
	};

	const accessToken = createToken(
		jwtPayload,
		config.access_secret,
		config.access_expires_in
	);
	const refreshToken = createToken(
		jwtPayload,
		config.refresh_secret,
		config.refresh_expires_in
	);

	return { userData, accessToken, refreshToken };
};
