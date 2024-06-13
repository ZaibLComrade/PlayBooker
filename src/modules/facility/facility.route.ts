import { Router } from "express";
import {deleteFacility, getFacility, postFacility, putFacility} from "./controller";
import {auth} from "../../middleware/auth";

const facilityRouter = Router();

facilityRouter.get("/:id?", auth(), getFacility);
facilityRouter.post("/", auth("admin"), postFacility);
facilityRouter.put("/:id", auth("admin"), putFacility);
facilityRouter.delete("/:id", auth("admin"), deleteFacility);

export default facilityRouter;
