import bcrypt from 'bcrypt';
const saltRounds = 10;


//hasher le password
export async function hashPassword(password: string): Promise<string> {
	try {
		const hashPassword = await bcrypt.hash(password, saltRounds);
		console.log('Password hashed successfully');
		return hashPassword;
	} catch (error) {
		console.error('Error during password hashing', error);
		throw error;
	}
}

//verif un mdp saisi par un user |||| pour le moment ne sert pas
// export async function verifPassword(password: string, hashPassword: string): Promise<void> {
// 	try {
// 		const matchPass = await bcrypt.compare(password, hashPassword);
// 		console.log(matchPass ? 'Mot de passe valide' : 'Mot de passe invalide');
// 	} catch (error) {console.error('Erreur avec la vérification du mot de passe: ', error);}
// }




/*memo
Promise -> valeur unique qui sera dispo now or later
3 etats possibles -> en attente | resolue | rejetee
*/