import { z } from "zod";
import {role} from "./user.contant";

export const createUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string(),
	phone: z.string(),
	role: z.enum(role),
});
