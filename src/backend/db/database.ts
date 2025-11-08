import { FastifyInstance } from 'fastify';
import { fpSqlitePlugin } from 'fastify-sqlite-typed';


export async function initDb(server: FastifyInstance) {
	await server.register(fpSqlitePlugin, { dbFilename: './data/db.sqlite'});

	await server.db.exec(`

	CREATE TABLE IF NOT EXISTS users (
	id_user INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL,
	password TEXT NOT NULL);

	CREATE TABLE IF NOT EXISTS friends (
	id_relationship INTEGER PRIMARY KEY AUTOINCREMENT,
	id_self INTEGER NOT NULL,
	id_friend INTEGER NOT NULL,
	flag INTEGER,
	FOREIGN KEY (id_self) REFERENCES users(id_user),
	FOREIGN KEY (id_friend) REFERENCES users(id_user));

	CREATE TABLE IF NOT EXISTS msgs (
	id_msg INTEGER PRIMARY KEY AUTOINCREMENT,
	msg TEXT NOT NULL,
	id_from INTEGER NOT NULL,
	id_to INTEGER NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_from) REFERENCES users(id_user),
	FOREIGN KEY (id_to) REFERENCES users(id_user))`);

	console.log('✅ Base de données créer avec succés !')
}


//friend.FLAG => 0:blocked 1:yes 2:asking 3:got_asked

//memo

// commande sql -> nameType | type | contraintes
// PRIMARY KEY -> combinaison NOT NULL/UNIQUE
// async -> asynchrone = bloque pas le prog pendant que la ft s'execute
// await -> wait is not finish
// ici on attend que la table soit faite avant de continuer
// FOREIGN KEY relie une colonne de 2 tables
// REFERENCES permet de verifier que les 2 users existe, ca evite les erreurs
