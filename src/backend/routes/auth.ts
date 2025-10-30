import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { verifUser, verifDataUser } from '../utils/validation.js';
import { hashPassword } from '../utils/security.js';
import { db } from '../db/database.js';


export default async function authRoutes(server: FastifyInstance) {
	server.get('/api/auth/status', async () => ({ loggedIn: false }));

	server.post('/api/login', async (req, reply) => {
		const { username, password } = req.body as any;

		if (!username || !password) {
			return reply.code(400).send({ success: false }); }

		try {
			const user = verifUser(username, password);
			console.log(' Connexion réussie: ', username);
			return { succes: true };
		} catch (error: any) {
			return reply.code(401).send({ success: false, error: error.message }); }
	})

	server.post('/api/register', async (req, reply) => {
		const { username, password, email } = req.body as any;
		const formatDataError = verifDataUser(username, password, email);

		if (formatDataError) {
			return reply.code(401).send({ success: false, error: formatDataError }); }
		
		try {
			const user = await createUser(username, password, email);
			return {success: true, user};
		} catch (error: any) {
			return reply.code(401).send({ success: false, error: error.message }); }
	})
}



export async function createUser(username: string, password: string, email: string) {
	const hashPass = await hashPassword(password);
	
	try {
		//sql de mort + faire mumuse avec la db
	} catch (error: any) {
		
	}
}


/*memo
pour le principe de saltRounds: application de 2^10 (1024)iterations de transfo du mdp
*/