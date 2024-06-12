class ApiError extends Error {
	constructor(
		public statusCode: number,
		public message: string,
		public isOperational: boolean = true,
		public stack: string = ""
	) {
		super(message);
		if (stack === "") {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export default ApiError;
