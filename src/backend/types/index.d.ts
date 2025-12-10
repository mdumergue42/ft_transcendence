export interface User {
	id: number;
	username: string;
	wins: number;
	losses: number;
}

export interface FastifyJWT {
	id_user: number;
	username: string;
	email: string;
}

export type Dbase = any;
