import type { FetchDoc } from "../../../@types";
import type { IFacility } from "../facility.interface";
import Facility from "../facility.model";

export const fetchFacility: FetchDoc<IFacility> = async (query) => {
	return await Facility.find(query, { __v: 0 });
};
