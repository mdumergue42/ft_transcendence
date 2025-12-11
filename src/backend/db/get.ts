import { Dbmode } from 'fastify-sqlite-typed';
import { Dbase } from '../types/index';

export async function getIdByName(name : string, db: Dbase) {
	const stmt = await db.prepare(`SELECT id_user as id FROM users WHERE username = ?`);
	let result = await stmt.get([name])
	if (result)
		result = result.id;
	return result;
}

export async function getAllByName(name : string, db: Dbase) {
	const stmt = await db.prepare(`SELECT * FROM users WHERE username = ?`);
	let result = await stmt.get([name])
	return result;
}

export async function getAllByMail(mail : string, db: Dbase) {
	const stmt = await db.prepare(`SELECT * FROM users WHERE email = ?`);
	let result = await stmt.get([mail])
	return result;
}

export async function getAllByNameOrMail(name : string, mail: string, db: Dbase) {
	const stmt = await db.prepare(`SELECT * FROM users WHERE username = ? OR email = ?`);
	let result = await stmt.get([name, mail])
	return result;
}

export async function getNameById(id : number, db: Dbase) {
	const stmt = await db.prepare(`SELECT username as name FROM users WHERE id_user = ?`);
	let result = await stmt.get([id])
	if (result)
		result = result.name;
	return result;
}

export async function getAllById(id : number, db: Dbase) {
	const stmt = await db.prepare(`SELECT * FROM users WHERE id_user = ?`);
	let result = await stmt.get([id])
	return result;
}

export async function getAvatarByName(name : string, db: Dbase) {
	const stmt = await db.prepare(`SELECT avatar as avatar FROM users WHERE username = ?`);
	let result = await stmt.get([name])
	if (result)
		result = result.avatar;
	return result;
}
export async function getDescByName(name: string, db:Dbase) {
	const stmt = await db.prepare(`SELECT about_me as desc FROM users WHERE username = ?`);
	let result = await stmt.get([name])
	if (result)
		result = result.desc;
	return result;
}
export async function getColorById(id: number, db:Dbase) {
	const stmt = await db.prepare(`SELECT color as color FROM users WHERE id_user = ?`);
	let result = await stmt.get([id])
	if (result)
		result = result.color;
	return result;
}

export async function getFlagFriendShip(friendId:number, selfId:number, db:Dbase)
{
	const stmt = await db.prepare(`SELECT flag as flag FROM friends WHERE id_friend = ? AND id_self = ?`);
	let result = await stmt.get([friendId, selfId]);
	if (result)
		result = result.flag;
	return result;
}

export async function getHistoricById(id:number, db:Dbase, flag:Dbase)
{
	var stack = [id, id];

	var sql = "SELECT match_type,id_p1,id_p2,score_p1,score_p2,date FROM matchs WHERE (id_p1 = ? OR id_p2 = ?) "

	if (flag.mode != "all")
	{
		sql += "AND match_type = ? ";
		stack.push(flag.mode);
	}

	sql += "ORDER BY date DESC LIMIT ?";
	stack.push(flag.limit);

	const stmt = await db.prepare(sql);
	let result = await stmt.all(stack);
	return result;
}

export async function getAllFriends(id:number, db:Dbase)
{
	const stmt = await db.prepare(`SELECT friends.id_friend, friends.flag, users.username FROM friends JOIN users ON users.id_user = friends.id_friend WHERE id_self = ?`);
	let result = await stmt.all([id]);
	if (result == undefined)
		return [];
	return result;
}

export async function getAllMsg(id: number, db:Dbase)
{
	const stmt = await db.prepare(`SELECT msg,id_from,id_to FROM msgs WHERE id_from = ? OR id_to = ? ORDER BY date`);
	let result = await stmt.all([id, id]);
	if (result == undefined)
		return [];
	return result;
}


export async function getCountFriend(idFrom: number, idTo:number, db:Dbase)
{
	const stmt = await db.prepare(`SELECT COUNT(1) AS nb FROM friends WHERE id_self = ? AND id_friend = ?`);
	let result = await stmt.get([idFrom, idTo]);
	if (result != undefined)
		result = result.nb;
	return result;
}

export async function getCodeStck(id_user:number, code:string, db:Dbase)
{
	const stmt = await db.prepare(`SELECT * FROM two_fa_code
		WHERE id_user_2fa = ?
		AND code_2fa = ?
		AND expire_at > datetime('now')`);
	let result = await stmt.get([id_user, code]);
	return result;
}

export async function getEmailVerified(id_user : number, db: Dbase) {
	const stmt = await db.prepare(`SELECT email_verified as email FROM users WHERE id_user = ?`);
	let result = await stmt.get([id_user])
	if (result)
		result = result.email;
	return result;
}

export async function getEmailByUsername(name : string, db: Dbase) {
	const stmt = await db.prepare(`SELECT email FROM users WHERE username = ?`);
	let result = await stmt.get([name])
	return result;
}
