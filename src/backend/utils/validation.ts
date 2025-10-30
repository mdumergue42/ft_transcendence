export async function verifDataUser(username: string, password: string, email: string) {
	const validUsername = validateUsername(username);
	if (!validUsername) return 'Le nom d\'utilisateur ne peut contenir que des lettres, des chiffres et underscore.';

	const validPassword = validatePassword(password);
	if (!validPassword) return 'Le mot de passe doit contenir 5 a 42 caracteres, au moins 1 majuscule, une minuscule, un chiffre.';

	const validEmail = validateEmail(email);
	if (!validEmail) return 'L\'email n\'est pas conforme au Mail Protocole.';

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


export async function verifUser(username: string, password: string) {
	
}