import { type RequestHandler, Router } from "express";
import authRouter from "../modules/auth/auth.route";

interface Route {
	path: string;
	route: RequestHandler;
}

const router = Router();

const routes: Route[] = [
	{
		path: "/auth",
		route: authRouter,
	}
];

routes.forEach(({ path, route }: Route) => {
	router.use(path, route);
});

export default router;
