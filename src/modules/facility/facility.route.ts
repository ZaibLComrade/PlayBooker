import { Router } from "express";
import {
	deleteFacility,
	getFacility,
	postFacility,
	putFacility,
} from "./controller";
import { auth } from "../../middleware/auth";
import { validateRequest } from "../../middleware/validateRequest";
import {
	createFacilitySchema,
	updateFacilitySchema,
} from "./facility.validation";

const facilityRouter = Router();

facilityRouter.get("/:id?", getFacility);
facilityRouter.post(
	"/",
	validateRequest(createFacilitySchema),
	auth("admin"),
	postFacility
);
facilityRouter.put(
	"/:id",
	validateRequest(updateFacilitySchema),
	auth("admin"),
	putFacility
);
facilityRouter.delete("/:id", auth("admin"), deleteFacility);

export default facilityRouter;
