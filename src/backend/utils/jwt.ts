import jwt from '@fastify/jwt';
import { FastifyInstance } from 'fastify';
import { FastifyJWT } from '../types/index';


export function generateJWT(server: FastifyInstance, user: FastifyJWT): string {
	const token =  server.jwt.sign({id_user: user.id_user, username: user.username, email: user.email},
		{expiresIn: '24h'}
	);
	return token;
}

export async function verifJWT(server: FastifyInstance, token: string): Promise<FastifyJWT | null> {
	try {
		const decoded = await server.jwt.verify(token) as FastifyJWT;
		return decoded;
	} catch (error) { return null; }
}
