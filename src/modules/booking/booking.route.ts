import { Router } from "express";
import { getBooking, postBooking } from "./controller";
import { validateRequest } from "../../middleware/validateRequest";
import { auth } from "../../middleware/auth";
import { createBookingSchema } from "./booking.validation";

const bookingRouter = Router();

bookingRouter.get("/", auth("user"), getBooking);
bookingRouter.post(
	"/",
	validateRequest(createBookingSchema),
	auth("user"),
	postBooking
);

export default bookingRouter;
