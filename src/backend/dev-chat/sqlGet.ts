export async function getIdByName(name : string, db: any) {
	const stmt = await db.prepare(`SELECT id_user as id FROM users WHERE username = ?`);
	let result = await stmt.get([name])
	if (result)
		result = result.id;
	return result;
}
export async function getNameById(id : number, db: any) {
	const stmt = await db.prepare(`SELECT username as name FROM users WHERE id_user = ?`);
	let result = await stmt.get([id])
	if (result)
		result = result.name;
	return result;
}
export async function getAvatarByName(name : string, db: any) {
	const stmt = await db.prepare(`SELECT avatar as avatar FROM users WHERE username = ?`);
	let result = await stmt.get([name])
	if (result)
		result = result.avatar;
	return result;
}

export async function getFlagFriendShip(friendId:number, selfId:number, db:any)
{
	const stmt = await db.prepare(`SELECT flag as flag FROM friends WHERE id_friend = ? AND id_self = ?`);
	let result = await stmt.get([friendId, selfId]);
	if (result)
		result = result.flag;
	return result;
}

export async function getHistoricById(id:number, db:any, flag:any)
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

export async function getAllFriends(id:number, db:any)
{
	const stmt = await db.prepare(`SELECT friends.id_friend, friends.flag, users.username FROM friends JOIN users ON users.id_user = friends.id_friend WHERE id_self = ?`);
	let result = await stmt.all([id]);
	if (result == undefined)
		return [];
	return result;
}

export async function getAllMsg(id: number, db:any)
{
	const stmt = await db.prepare(`SELECT msg,id_from,id_to FROM msgs WHERE id_from = ? OR id_to = ? ORDER BY date`);
	let result = await stmt.all([id, id]);
	if (result == undefined)
		return [];
	return result;
}

export async function insertUser(name:string, email:string, pass:string, db:any)
{
	const stmt = await db.prepare(`INSERT INTO users(username, email, password, avatar) VALUES(?, ?, ?, ?)`);
	await stmt.run([name, email, pass, 'default/cara.jpg']);
}

export async function insertMatchs(type:string, id1:number, id2:number, s1:number, s2:number, db:any)
{
	const stmt = await db.prepare(`INSERT INTO matchs(match_type, id_p1, id_p2, score_p1, score_p2) VALUES (?, ?, ?, ?, ?)`);
	await stmt.run([type, id1, id2, s1, s2]);

}

export async function insertFriend(idFrom:number, idTo:number, flag:number=1, db:any)
{
	const stmt = await db.prepare(`INSERT INTO friends(id_self, id_friend, flag) VALUES (?, ?, ?)`);
	await stmt.run([idFrom, idTo, flag]);
}

export async function insertMsg(msg: string, idFrom:number, idTo:number, db:any)
{
	const stmt = await db.prepare(`INSERT INTO msgs(msg, id_from, id_to) VALUES (?, ?, ?)`);
	await stmt.run([msg, idFrom, idTo]);
}

export async function updateFlagFriend(idFrom:number, idTo:number, flag:number, db:any)
{

	const stmt = await db.prepare(`UPDATE friends SET flag = ? WHERE id_self = ? AND id_friend = ?`);
	await stmt.run([flag, idFrom, idTo]);
}

export async function getCountFriend(idFrom: number, idTo:number, db:any)
{
	const stmt = await db.prepare(`SELECT COUNT(1) AS nb FROM friends WHERE id_self = ? AND id_friend = ?`);
	let result = await stmt.get([idFrom, idTo]);
	if (result != undefined)
		result = result.nb;
	return result;
}
