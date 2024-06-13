import type { NextFunction, Response } from "express";
import type { AsyncReqHandler, CustomRequest } from "../@types";

const catchAsync = (reqHandler: AsyncReqHandler) => {
	return (req: CustomRequest, res: Response, next: NextFunction) => {
		Promise.resolve(reqHandler(req, res, next)).catch((err) => {
			next(err);
		});
	};
};

export default catchAsync;
