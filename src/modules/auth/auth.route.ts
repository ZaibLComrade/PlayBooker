import { Router } from "express";
import {signUp, login} from "./controller";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

export default authRouter;
