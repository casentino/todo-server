import jwt from 'jsonwebtoken';
import { SERVER_ENC_KEY } from '../config';

export function splitBearer(token: string) {
	const [bearer, jwtToken] = token.split(' ');
	if (!bearer || bearer !== 'Bearer') {
		return '';
	}
	return jwtToken;
}

export function genJWTToken(payload: Record<string, any>) {
	return jwt.sign(payload, SERVER_ENC_KEY);
}
export function validJWT(authorization: string) {
	return new Promise<boolean>((resolve, reject) => {
		const token = splitBearer(authorization);
		if (!token) {
			reject(new Error('InValidation Token'));
			return;
		}
		jwt.verify(token, SERVER_ENC_KEY, (err, decode) => {
			if (err) {
				reject(err);
			}
			resolve(true);
		});
	});
}

export function validToken(authorization: string) {
	return new Promise<string | jwt.JwtPayload | undefined>((resolve, reject) => {
		const token = splitBearer(authorization);
		if (!token) {
			reject(new Error('InValidation Token'));
			return;
		}
		jwt.verify(token, SERVER_ENC_KEY, (err, decode) => {
			if (err) {
				reject(err);
			}
			resolve(decode);
		});
	});
}
