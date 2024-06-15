import type { Request, Response, NextFunction } from "express";
import type { JwtPayload } from "jsonwebtoken";

export type AsyncReqHandler = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => Promise<void>;

// Bot error and success response
export interface ServerResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data?: unknown;
	stack?: string;
	errorMessages?: Array<{
		path: string | number;
		message: string;
	}>;
}

export type ErrorHandler<T> = (err: T) => ServerResponse;

export interface CustomRequest extends Request {
	user?: JwtPayload;
}

export interface SearchQuery {
	[key?: string]: string;
	_id?: string;
	user?: string;
}

// Services
export type FetchDoc<T> = (query: SearchQuery) => Promise<T[] | null>
export type CreateDoc<T> = (payload: T) => Promise<T | null>;
export type UpdateDoc<T> = (
	query: SearchQuery,
	payload: Partial<T>
) => Promise<T | null>;
export type DeleteDoc<T> = (query: SearchQuery) => Promise<T | null>;
