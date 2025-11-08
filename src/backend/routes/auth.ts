import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { verifDataUser } from '../utils/validation.js';
import { hashPassword } from '../utils/security.js';
import { REPL_MODE_SLOPPY } from 'repl';


export async function authRt(server: FastifyInstance) {
	server.get('/api/auth/status', async () => ({ loggedIn: false }));

	// login ------------------------
	server.post('/api/login', async (req, reply) => {
		const { username, password } = req.body as any;

		if (!username || !password) {
			return reply.code(400).send({ success: false, error: 'Invalid credentials' }); }

		try {
			const user = await server.db.get( 'SELECT * FROM users WHERE username = ?', username);
			if (!user) {
				return reply.code(401).send({ success: false, error: 'User not found' }); }
			
			const validPass = await bcrypt.compare(password, user.password);
			if (!validPass) {
				return reply.code(401).send({ success: false, error: 'Invalid password' }); }
			
			console.log(' Login succesfull: ', username);
			//il faut tout return pour le frontend et l'API
			return { 
				success: true,
				user: {id: user.id_user, username: user.username, email: user.email}};
		} catch (error: any) {
			return reply.code(401).send({ success: false, error: error.message }); }
	})


	// register ------------------------
	server.post('/api/register', async (req, reply) => {
		const { username, password, email } = req.body as any;

		const formatDataError = verifDataUser(username, password, email);
		if (formatDataError) {
			return reply.code(401).send({ success: false, error: formatDataError }); }

		try {
			const user = await createUser(server, username, password, email);
			return {success: true, user};
		} catch (error: any) {
			return reply.code(401).send({ success: false, error: error.message }); }
	})
}



async function createUser(server: FastifyInstance, username: string, password: string, email: string) {
	const hashPass = await hashPassword(password);

	//je n'ai pas trouve le code pour un echec de hash de mdp ------ WARNING
	//	if (hashPass) {
	//		return reply.code() }
	
	try {
		// check if no duplicate
		const existUser = await server.db.get ( 'SELECT * FROM users WHERE username = ?', username );
		if (existUser) { throw new Error('Username already used') }

		const existMail = await server.db.get ( 'SELECT * FROM users WHERE email = ?', email );
		if (existMail) { throw new Error('Email already used') }

		// insert newUser
		const newUser = await server.db.run( 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)', username, email, hashPass );

		// keep newUser without password for the frontend
		const keepNewUser = await server.db.get ( 'SELECT id_user, username, email FROM users WHERE id_user = ?', newUser.lastID )
	
		return keepNewUser;
	} catch (error: any) {
		throw new Error(error.message);
	}
}


/*memo
pour le principe de saltRounds: application de 2^10 (1024)iterations de transfo du mdp
*/