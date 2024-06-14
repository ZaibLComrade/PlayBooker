import { Router } from "express";
import { signUp, login } from "./controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserSchema } from "../user/user.validation";
import { loginSchema } from "./auth.validation";

const authRouter = Router();

authRouter.post("/signup", validateRequest(createUserSchema), signUp);
authRouter.post("/login", validateRequest(loginSchema), login);

export default authRouter;
