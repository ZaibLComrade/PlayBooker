import { Router } from "express";
import { deleteBooking, getBooking, postBooking } from "./controller";
import { validateRequest } from "../../middleware/validateRequest";
import { auth } from "../../middleware/auth";
import { createBookingSchema } from "./booking.validation";

const bookingRouter = Router();

bookingRouter.get("/", auth(), getBooking);
bookingRouter.post(
	"/",
	validateRequest(createBookingSchema),
	auth("user"),
	postBooking
);
bookingRouter.delete("/:id", auth("user"), deleteBooking);

export default bookingRouter;
