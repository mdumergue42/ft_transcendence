import { Dbase } from '../types/index';

export async function insertUser(name:string, email:string, pass:string, db:Dbase)
{
	const stmt = await db.prepare(`INSERT INTO users(username, email, password, avatar, about_me, color) VALUES(?, ?, ?, ?, ?, ?)`);
	return await stmt.run([name, email, pass, '', '', 'green']);
}

export async function insertMatchs(type:string, id1:number, id2:number, s1:number, s2:number, db:Dbase)
{
	const stmt = await db.prepare(`INSERT INTO matchs(match_type, id_p1, id_p2, score_p1, score_p2) VALUES (?, ?, ?, ?, ?)`);
	await stmt.run([type, id1, id2, s1, s2]);

}

export async function insertFriend(idFrom:number, idTo:number, flag:number=1, db:Dbase)
{
	const stmt = await db.prepare(`INSERT INTO friends(id_self, id_friend, flag) VALUES (?, ?, ?)`);
	await stmt.run([idFrom, idTo, flag]);
}

export async function insertMsg(msg: string, idFrom:number, idTo:number, db:Dbase)
{
	const stmt = await db.prepare(`INSERT INTO msgs(msg, id_from, id_to) VALUES (?, ?, ?)`);
	await stmt.run([msg, idFrom, idTo]);
}
