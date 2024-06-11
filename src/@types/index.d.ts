import type { Request, Response, NextFunction } from "express";

export type AsyncReqHandler = ( 
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>
