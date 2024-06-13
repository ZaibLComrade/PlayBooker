import type { CreateDoc } from "@/@types";
import type { IFacility } from "../facility.interface";
import Facility from "../facility.model";

export const createFacility: CreateDoc<IFacility> = async (payload) => {
	return await Facility.create(payload);
};
