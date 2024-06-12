import { Router } from "express";
import {signUp} from "./controller";
import {login} from "./controller/login";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", login);

export default authRouter;
