import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import bcrypt from 'bcrypt';
import { verifDataUser } from '../utils/validation.js';
import { hashPassword } from '../utils/security.js';
import { REPL_MODE_SLOPPY } from 'repl';
import { generateJWT } from '../utils/jwt.js';
import { FastifyJWT } from '@fastify/jwt';
import { generateCode, saveCode, verifCode } from '../utils/2fa.js';
import { request } from 'http';
import { send2faCodeEmail, sendVerifEmail } from '../utils/email.js';
import { getAllByName, getIdByName, getAllById, getAllByNameOrMail, getAllByMail} from '../db/get.js'
import { updatetfa_enable, updateEmailVerif, deleteUserWithName } from '../db/update.js'
import { insertUser } from '../db/insert.js'

export async function authRt(server: FastifyInstance) {
	
	// status -----------------------
	server.get('/api/auth/status', {
		onRequest: [server.authenticate]
	}, async (request: any, reply) => {
		const id = await getIdByName(request.user.username, server.db) 
		if (id  == undefined)
			return reply.code(401).send({
				success: false,
				loggedIn: false,
			});
		return {
			success: true,
			loggedIn: true,
			user: request.user
		};
	});

	// login ------------------------
	server.post('/api/auth/login', async (req, reply) => {
		const { username, password } = req.body as any;

		if (!username || !password) {
			return reply.code(400).send({ success: false, error: 'Invalid credentials' }); }

		try {
			const user = await getAllByName(username, server.db);
			if (!user) {
				return reply.code(401).send({ success: false, error: 'User not found' }); }
			
			if (user.email_verified !== 1) {
				return reply.code(403).send({ success: false, error: "Email not verified"});
			}
			
			const validPass = await bcrypt.compare(password, user.password);
			if (!validPass) {
				return reply.code(401).send({ success: false, error: 'Invalid password' }); }
			
			if (user.two_fa_enabled === 1) {
				const code = generateCode();
				await saveCode(server.db, user.id_user, code);

				const info = await send2faCodeEmail(
					{
						id_user: user.id_user,
						username: user.username,
						email:user.email
					}, code
				)

				return {
					success: true,
					requiresTwoFactor: true,
					id_user: user.id_user
				};
			}
			
			const token = generateJWT(server, {
				id_user: user.id_user,
				username: user.username,
				email: user.email
			});
			
			//il faut tout return pour le frontend et l'API
			return { 
				success: true,
				token: token,
				user: {id: user.id_user, username: user.username, email: user.email}};
		}
		catch (error: any) {
			return reply.code(401).send({ success: false, error: error.message }); }
	});

	// verif 2fa -----------------------
	server.post('/api/auth/verify-2fa', async (request, reply) => {
		const { name, code } = request.body as any;
		const id_user = await getIdByName(name, server.db)
		if (!id_user) {
			return reply.code(400).send({ success: false, error: 'Error UserName' });
		}
		if (!code) {
			return reply.code(400).send({ success: false, error: 'Missing data' });
		}
		const validCode = await verifCode(server.db, id_user, code);
		if (!validCode) {
			return reply.code(401).send({ success: false, error: 'Expire or invalid code'});
		}

		const user = await getAllById(id_user, server.db);

		const token = generateJWT(server, {
			id_user: user.id_user,
			username: user.username,
			email: user.email
		});

		return { 
			success: true,
			token: token,
			user: {id: user.id_user, username: user.username, email: user.email}};
	});

	//resend 2fa code email
	server.post('/api/auth/resend-2fa-code', async (request, reply) => {
		const { id_user } = request.body as any;

		if (!id_user) {
			return reply.code(400).send({ success: false, error: "Missing id_user" });
		}

		try {
			const user = await getAllById(id_user, server.db);
			if (!user) {
				return reply.code(404).send({ success:false, error: "User not found" });
			}
		} catch (error) {

		}
		//a finir**************************
	});

	// enable 2fa --------------------
	server.post('/api/enable-2fa', async(request, reply) => {
		const { id_user } = request.body as any;

		await updatetfa_enable(1, id_user, server.db);
		return { success: true, message: '2FA enabled'}
	});

	// register ------------------------
	server.post('/api/auth/register', async (req, reply) => {
		const { username, password, email } = req.body as any;

		const formatDataError = await verifDataUser(username, password, email);
		if (formatDataError) {
			return reply.code(400).send({ success: false, error: formatDataError }); }

		try {
			const existingUser = await getAllByNameOrMail(username, email, server.db);
			if (existingUser) {
				return reply.code(400).send({ success: false, error: 'Email or username already used'});
			}


			const user = await createUser(server, username, password, email);
			const tokentmp = server.jwt.sign({ id_user: user.id_user }, { expiresIn: '24h' });
			
			try {

				await sendVerifEmail(user, tokentmp);

				return {success: true, user, message: 'Check your email to complete your registration.'};
			}
			catch (error : any) {
				await deleteUserWithName(username, server.db);
				return reply.code(500).send({ success: false, error: error.message });
			}
		}
		catch (error: any) {
			return reply.code(error.code ? error.code : 401).send({ success: false, error: error.message });
		}
	});

	// verif email ---------------------
	server.get('/api/auth/verify-email', async(request: FastifyRequest, reply: FastifyReply) => {
		const { id_user, token } = request.query as any;
		const userId = Number(id_user);

		if (!userId || !token) {
			return reply.code(400).send({ success: false, error: 'Invalid link'});
		}

		try {
			const payload = server.jwt.verify(token) as { id_user: number };
			if (payload.id_user !== userId) {
				return reply.code(400).send({ success: false, error: 'Invalid link'});
			}

			const user = await server.db.get('SELECT email_verified FROM users WHERE id_user = ?', userId);
			if (!user) {
				return reply.code(404).send({ success: false, error: 'User not found'});
			}
			if (user.email_verified === 1) {
				return reply.send('<h2>Email already verified !</h2>')
			}


			await server.db.run('UPDATE users SET email_verified = 1 WHERE id_user = ?', userId);
			return reply.send('<h2>Email successfully verified !</h2>');
		} catch (error) {
			return reply.code(400).send({ success: false, error: 'Link expired or invalid'});
		}
	});

	// resend email verif
	server.post('/api/auth/resend-verification', async (request, reply) => {
		const { email } = request.body as any;

		if (!email) {
			return reply.code(400).send({ success:false, error: 'Missing email'});
		}

		try {
			const user = await getAllByMail(email, server.db);
			if (!user) {
				return reply.code(404).send({ success: false, error: 'User not found'});
			}

			if (user.email_verified) {
				return reply.send({ success: true, message: 'Email already check'});
			}

			const tokentmp = server.jwt.sign({ id_user: user.id_user }, { expiresIn: '24h'});
			await sendVerifEmail(user, tokentmp);

			return reply.send({ success: true, message: 'Email successfully resent'});
		}
		catch (error: any) {
			return reply.code(500).send({ success: false, error: error.message});
		}
	});

	//get email by username
	server.post('/api/auth/get-email-by-username', async (request, reply) => {
		const { username } = request.body as any;

		const user = await server.db.get(
			'SELECT email FROM users WHERE username = ?', username
		);

		if (!user) {
			return reply.code(404).send({ error: "User not found"});
		}
		return reply.send({ email: user.email });
	});

	// profile -------------------------
	server.get('/api/auth/profile', async (request: FastifyRequest, reply: FastifyReply) => {
		const authHeader = request.headers.authorization;
		if (!authHeader || !authHeader.startsWith('Bearer ')) {
			return reply.code(401).send({ success: false, error: 'Authenticate failed.'});
		}

		const token = authHeader.substring(7);
		try {
			const decoded = await server.jwt.verify(token) as FastifyJWT;
			return { success: true, user: decoded };
		} catch (error) {
			return reply.code(401).send({ success: false, error: 'Invalid or expire token'});
		}
	})
}



async function createUser(server: FastifyInstance, username: string, password: string, email: string) {
	const hashPass = await hashPassword(password);

	//je n'ai pas trouve le code pour un echec de hash de mdp ------ WARNING
	//	if (hashPass) {
	//		return reply.code() }
	
	try {
		const existUser = await getAllByName(username, server.db);
		if (existUser) { throw new Error('Username already used') }

		const existMail = await getAllByMail(email, server.db);
		if (existMail) { throw new Error('Email already used') }

		const newUser = await insertUser(username, email, hashPass, server.db);
	
		return {id_user:newUser.lastID, username:username, email:email};
	}
	catch (error: any) {
		throw new Error(error.message);
	}
}


/*memo
pour le principe de saltRounds: application de 2^10 (1024)iterations de transfo du mdp
*/
