import type { role } from "./user.contant";

export type Role = typeof role[number];

export interface IUser {
	_id?: string;
	__v?: number;
	name: string;
	email: string;
	password?: string;
	phone: string;
	role: Role;
	address: string;
}
