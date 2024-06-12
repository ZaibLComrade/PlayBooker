import type { role } from "./user.contant";

export interface IUser {
	_id?: string;
	name: string;
	email: string;
	password: string;
	phone: string;
	role: (typeof role)[number];
	address: string;
}
