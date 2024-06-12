import { type RequestHandler, Router } from "express";

interface Route {
	path: string;
	route: RequestHandler;
}

const router = Router();

const routes: Route[] = [
];

routes.forEach(({ path, route }: Route) => {
	router.use(path, route);
});

export default router;
