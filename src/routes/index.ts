import { Router } from "express";
import type { RequestHandler } from "express";
import authRouter from "../modules/auth/auth.route";
import facilityRouter from "../modules/facility/facility.route";

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
];

routes.forEach(({ path, route }: Route) => {
	router.use(path, route);
});

export default router;
