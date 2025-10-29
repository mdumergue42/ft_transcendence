import { FastifyInstance } from 'fastify';

export default async function authRoutes(server: FastifyInstance) {
	server.get('/api/auth/status', async () => ({ loggedIn: false }));

	server.post('/api/login', async (req, reply) => {
		const { username, password } = req.body as any;
		if (username && password) return { success: true };
		reply.code(400).send({ success: false });
	});
}
