export interface ISession {
	id: string;
	userId: string;
	email: string;
	name: string;
	role: string;
	exp: number;
	iat: number;
}
