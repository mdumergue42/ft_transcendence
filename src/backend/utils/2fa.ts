import { Server } from 'http';
import {getCodeStck} from '../db/get.js';
import { insertCodeTfa } from '../db/insert.js';
import { deleteCode2fa } from '../db/update.js';

export function generateCode(): string {
	return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function verifCode(db: any, id_user: number, code: string): Promise<boolean> {
	const codeStck = await getCodeStck(id_user, code, db);
	if (!codeStck) { return false; }

	if (codeStck.code_2fa == code) {
		await deleteCode2fa(codeStck.id_code, db);
		return true;
	}
	return false;
}

export async function saveCode(db: any, id_user: number, code: string): Promise<void> {
	await insertCodeTfa(id_user, code, db);
}
