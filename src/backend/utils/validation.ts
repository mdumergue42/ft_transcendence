export async function verifDataUser(username: string, password: string, email: string) {
	const validUsername = validateUsername(username);
	if (!validUsername) return 'The username can only contain letters, numbers, and underscores.';

	const validPassword = validatePassword(password);
	if (!validPassword) return 'The password must contain between 5 and 42 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number.';

	const validEmail = validateEmail(email);
	if (!validEmail) return 'The email does not comply with the Mail Protocol.';

	return null;
}



export const validateUsername = (name: string) => {
	if (!name || !name.trim() || /\s/.test(name)) return false;

	const regex = /^[a-zA-Z0-9_]{3,16}$/;
	return regex.test(name);
};

export const validatePassword = (password: string) => {
	if (!password || !password.trim() || /\s/.test(password)) return false;

	const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5,42}$/;
	return regex.test(password);
};

export const validateEmail = (email: string) => {
	if (validateEmail.length > 254) return false;
	if (!email || !email.trim() || /\s/.test(email)) return false;

	//conforme au RFC - Mail Protocol
	const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
	return regex.test(email);
};
