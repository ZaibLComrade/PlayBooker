import type { Request, Response, NextFunction } from "express";

export type AsyncReqHandler = ( 
	req: Request,
	res: Response,
	next: NextFunction,
) => Promise<void>

export interface ServerResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data?: unknown;
	stack?: string;
	errorSources?: Array<{
		path: string;
		message: string;
	}>
}

// Service functions
export type CreateDoc<T> = (payload: T) => Promise<T | null>
