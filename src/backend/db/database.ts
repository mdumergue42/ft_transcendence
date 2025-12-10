import { FastifyInstance } from 'fastify';
import { fpSqlitePlugin } from 'fastify-sqlite-typed';


export async function initDb(server: FastifyInstance) {
	await server.register(fpSqlitePlugin, { dbFilename: './data/db.sqlite'});

	await server.db.exec(`

	CREATE TABLE IF NOT EXISTS users (
	id_user INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL,
	about_me TEXT,
	avatar TEXT,
	color TEXT,
	email_verified INTEGER DEFAULT 0,
	code_verif TEXT,
	expire_code_verif DATETIME,
	two_fa_enabled INTEGER DEFAULT 1,
	two_fa_secret TEXT,
	two_fa_method TEXT);

	CREATE TABLE IF NOT EXISTS friends (
	id_relationship INTEGER PRIMARY KEY AUTOINCREMENT,
	id_self INTEGER NOT NULL,
	id_friend INTEGER NOT NULL,
	flag INTEGER,
	FOREIGN KEY (id_self) REFERENCES users(id_user),
	FOREIGN KEY (id_friend) REFERENCES users(id_user));

	CREATE TABLE IF NOT EXISTS matchs (
	id_match INTEGER PRIMARY KEY AUTOINCREMENT,
	match_type TEXT NOT NULL,
	id_p1 INTEGER NOT NULL,
	id_p2 INTEGER,
	score_p1 INTEGER NOT NULL,
	score_p2 INTEGER NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_p1) REFERENCES users(id_user),
	FOREIGN KEY (id_p2) REFERENCES users(id_user));

	CREATE TABLE IF NOT EXISTS msgs (
	id_msg INTEGER PRIMARY KEY AUTOINCREMENT,
	msg TEXT NOT NULL,
	id_from INTEGER NOT NULL,
	id_to INTEGER NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_from) REFERENCES users(id_user),
	FOREIGN KEY (id_to) REFERENCES users(id_user));

	CREATE TABLE IF NOT EXISTS two_fa_code (
	id_code INTEGER PRIMARY KEY AUTOINCREMENT,
	id_user_2fa INTEGER NOT NULL,
	code_2fa TEXT NOT NULL,
	expire_at DATETIME NOT NULL,
	attempts INTEGER DEFAULT 0,
	FOREIGN KEY (id_user_2fa) REFERENCES users(id_user));
	`)


	console.log('✅ Base de données créer avec succés !')
}
