import type { UpdateDoc } from "../../../@types";
import type { IFacility } from "../facility.interface";
import Facility from "../facility.model";

export const updateFacility: UpdateDoc<IFacility> = async (query, payload) => {
	return await Facility.findOneAndUpdate(query, payload, {
		new: true,
	});
};
