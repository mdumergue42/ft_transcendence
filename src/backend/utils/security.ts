import bcrypt from 'bcrypt';
const saltRounds = 10;

export async function hashPassword(password: string): Promise<string> {
	try {
		const hashPassword = await bcrypt.hash(password, saltRounds);
		return hashPassword;
	} catch (error) {
		throw error;
	}
}
