import { z } from "zod";

export const createFacilitySchema = z.object({
	name: z.string(),
	description: z.string(),
	pricePerHour: z.number(),
	location: z.string(),
	isDeleted: z.boolean(),
})
