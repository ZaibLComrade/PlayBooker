import catchAsync from "../utils/catchAsync";
import config from "../config";
import ApiError from "../utils/ApiError";
import jwt from "jsonwebtoken";
import type { Role } from "../modules/user/user.interface";
import type { RequestHandler } from "express";
import type { JwtPayload } from "jsonwebtoken";
import type { CustomRequest } from "../@types";

// Verifies request for admin and user roles and modifies request with verified user info
type Auth = (...requiredRole: Role[]) => RequestHandler;
export const auth: Auth = (...requiredRole) => {
	return catchAsync(async (req: CustomRequest, res, next) => {
		const authData = req.headers.authorization ?? "";
		const [, token] = authData.split(" ");
		if (token === undefined) {
			throw new ApiError(401, "You have no access to this route");
		}

		const decode = jwt.verify(token, config.access_secret) as JwtPayload;

		if (
			requiredRole.length !== 0 &&
			!requiredRole.includes(decode.role as Role)
		) {
			throw new ApiError(401, "You have no access to this route");
		}

		req.user = decode;
		next();
	});
};
