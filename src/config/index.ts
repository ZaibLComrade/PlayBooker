import dotenv from "dotenv";
import path from "path";
import getUri from "../utils/getUri";

dotenv.config({ path: path.join(process.cwd(), ".env") });

/* eslint-disable @typescript-eslint/non-nullable-type-assertion-style */

const isDevMode = process.env.NODE_ENV === "development";
const config = {
	port: process.env.PORT ?? 5000,
	isRemote: !isDevMode,
	db_name: process.env.DB_NAME as string,
	db_uri: isDevMode
		? process.env.DB_URI_LOCAL ?? ""
		: getUri(
				process.env.DB_URI_PROD ?? "",
				process.env.DB_USER ?? "",
				process.env.DB_PASS ?? ""
			),
	isDevMode,
	hash_salt: parseInt(process.env.HASH_SALT ?? "9"),
	access_secret: process.env.ACCESS_SECRET as string,
	refresh_secret: process.env.REFRESH_SECRET as string,
	access_expires_in: process.env.ACCESS_EXPIRES_IN as string,
	refresh_expires_in: process.env.REFRESH_EXPIRES_IN as string,
};
export default config;
