import type {role} from "./user.contant";

export interface IUser {
	name: string;
	email: string;
	password: string;
	phone: string;
	role: typeof role[number];
	address: string;
}
