import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

type CreateToken = (
	payload: JwtPayload,
	secret: string,
	expiresIn: string
) => string;
export const createToken: CreateToken = (payload, secret, expiresIn) => {
	return jwt.sign(payload, secret, { expiresIn });
};
