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

export async function getFlagFriendShip(friendId:number, selfId:number, db:any)
{
	const stmt = await db.prepare(`SELECT flag as flag FROM friends WHERE id_friend = ? AND id_self = ?`);
	let result = await stmt.get([friendId, selfId]);
	if (result)
		result = result.flag;
	return result;
}

export async function getHistoricById(id:number, db:any, flag:number= 0)
{
	//TODO FLAGS
	//victory only
	//lose only
	//pvp only
	//ia only
	const stmt = await db.prepare(`SELECT match_type,id_p1,id_p2,score_p1,score_p2 FROM matchs WHERE id_p1 = ? OR id_p2 = ? ORDER BY date DESC LIMIT 30`);
	let result = await stmt.all([id, id]);
	return result;
}
