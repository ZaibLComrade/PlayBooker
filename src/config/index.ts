import dotenv from "dotenv";
import path from "path";
import getUri from "../utils/getUri";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const isDevMode = process.env.NODE_ENV === "development";
const config = {
  port: process.env.PORT ?? 5000,
  isRemote: !isDevMode,
  db_name: process.env.db_name,
  db_uri: isDevMode
    ? process.env.DB_URI_LOCAL as string
    : getUri(
        process.env.DB_URI_PROD as string,
        process.env.DB_USER as string,
        process.env.DB_PASS as string,
      ),
  isDevMode,
  hash_salt: process.env.HASH_SALT,
  access_secret: process.env.ACCESS_SECRET,
  refresh_secret: process.env.REFRESH_SECRET,
};
export default config;
