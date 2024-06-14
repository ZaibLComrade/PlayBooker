import { Router } from "express";
import type { RequestHandler } from "express";
import authRouter from "../modules/auth/auth.route";
import facilityRouter from "../modules/facility/facility.route";
import bookingRouter from "../modules/booking/booking.route";
import checkRouter from "../modules/check";

interface Route {
	path: string;
	route: RequestHandler;
}

const router = Router();

const routes: Route[] = [
	{
		path: "/auth",
		route: authRouter,
	},
	{
		path: "/facility",
		route: facilityRouter,
	},
	{
		path: "/bookings",
		route: bookingRouter,
	},
	{
		path: "/check-availability",
		route: checkRouter,
	},
];

routes.forEach(({ path, route }: Route) => {
	router.use(path, route);
});

export default router;
