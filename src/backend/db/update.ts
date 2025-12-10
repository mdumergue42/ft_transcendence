import { Dbase } from '../types/index';

export async function updateFlagFriend(idFrom:number, idTo:number, flag:number, db:Dbase)
{

	const stmt = await db.prepare(`UPDATE friends SET flag = ? WHERE id_self = ? AND id_friend = ?`);
	await stmt.run([flag, idFrom, idTo]);
}

export async function updateUser(avatar:string | null, descr:string, color:string, id:number, db:Dbase)
{
	if (!avatar)
		avatar = "";
	const stmt = await db.prepare(`UPDATE users SET avatar = ?, about_me = ?,color = ? WHERE id_user = ?`);
	await stmt.run([avatar, descr, color,id]);
}

export async function updatetfa_enable(value: number, id:number, db:Dbase)
{
	const stmt = await db.prepare(`UPDATE users SET two_fa_enabled = ? WHERE id_user = ?`);
	await stmt.run([value, id]);
}

export async function updateEmailVerif(value: number, id:number, db:Dbase)
{
	const stmt = await db.prepare(`UPDATE users SET email_verified = ? WHERE id_user = ?`);
	await stmt.run([value, id]);
}
