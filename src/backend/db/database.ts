import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { fileURLToPath } from 'url'; //pour bien lire le chemin
import { dirname, join } from 'path'; // pour le chemin

//to have the file always in /data
const __dirname = dirname(fileURLToPath(import.meta.url));

export const db = await open({
 	filename: join(__dirname, '../../data/db.sqlite'),
 	driver: sqlite3.Database
});

// init table for users
export async function initDB() { await db.exec(
	`CREATE TABLE IF NO EXIST users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	username TEXT UNIQUE NOT NULL,
	email TEXT UNIQUE NOT NULL)
`)
	
	console.log('✅ Dinguerie Jose va pouvoir etre register')
}





//memo

// commande sql -> nameType | type | contraintes
// PRIMARY KEY -> combinaison NOT NULL/UNIQUE
// async -> asynchrone = bloque pas le prog pendant que la ft s'execute
// await -> wait is not finish
// ici on attend que la table soit faite avant de continuer