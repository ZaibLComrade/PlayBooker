import type { NextFunction, Request, Response } from "express";
import { AsyncReqHandler } from "../@types";

const catchAsync = (reqHandler: AsyncReqHandler) => {
	return (req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(reqHandler(req, res, next)).catch((err) => {
			next(err);
		});
	};
};

export default catchAsync;
