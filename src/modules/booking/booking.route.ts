import { Router } from "express";
import { postBooking } from "./controller";
import { validateRequest } from "../../middleware/validateRequest";
import { auth } from "../../middleware/auth";
import { createBookingSchema } from "./booking.validation";

const bookingRouter = Router();

bookingRouter.post(
	"/",
	validateRequest(createBookingSchema),
	auth("user"),
	postBooking
);

export default bookingRouter;
