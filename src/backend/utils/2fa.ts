import {getCodeStck} from '../db/get.js';

export function generateCode(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function verifCode(db: any, id_user: number, code: string): Promise<boolean> {
	const codeStck = await getCodeStck(id_user, code, db);
	if (!codeStck) { return false; }

	if (codeStck.attempts >= 3) {
		await db.run(
			`DELETE FROM two_fa_code WHERE id_code = ?`, codeStck.id_code
		);
		return false;
	}

	if (codeStck.code_2fa == code) {
		await db.run(
			`DELETE FROM two_fa_code WHERE id_code = ?`, codeStck.id_code
		);
		return true;
	}

	await db.run( 'UPDATE two_fa_code SET attempts = attempts + 1 WHERE id_code ?', codeStck.id_code);
	return false;
}

export async function saveCode(db: any, id_user: number, code: string): Promise<void> {
	await db.run(
		`INSERT INTO two_fa_code (id_user_2fa, code_2fa, expire_at)
		VALUES (?, ?, datetime('now', '+5 minutes'))`, id_user, code);
}
