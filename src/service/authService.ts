import { db } from '../db/DBConnector';
import User, { SignUpRequest } from '../model/User';
import { generateId } from '../utils/genUnique';

export function findUser(predict: (user: User) => boolean) {
	if (!db.data) return;

	return db.data.users.find(predict);
}
export async function register(signupReq: SignUpRequest) {
	if (!db.data) return;

	const { email, name, password } = signupReq;
	const user = {
		_id: generateId(),
		email,
		name,
		password,
	};
	db.data.users.push(user);
	await db.write();
	return user;
}
