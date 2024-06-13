import { Router } from "express";
import {postFacility} from "./controller";
import {auth} from "../../middleware/auth";

const facilityRouter = Router();

facilityRouter.post("/", auth("admin"), postFacility);

export default facilityRouter;
