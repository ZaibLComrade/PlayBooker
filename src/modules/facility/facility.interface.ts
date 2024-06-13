export interface IFacility {
	_id?: string;
	__v?: number;
	name: string;
	description: string;
	pricePerHour: number;
	location: string;
	isDeleted?: boolean;
}
