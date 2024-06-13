import type { DeleteDoc } from "../../../@types";
import type { IFacility } from "../facility.interface";
import Facility from "../facility.model";

export const removeFacility: DeleteDoc<IFacility> = async (query) => {
	return await Facility.findOneAndUpdate(
		query,
		{ isDeleted: true },
		{ new: true }
	);
};
