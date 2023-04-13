import jwt from 'jsonwebtoken';
import { SERVER_ENC_KEY } from '../config';

export function genJWTToken(payload: Record<string, any>) {
	return jwt.sign(payload, SERVER_ENC_KEY);
}
export function validJWT(token: string) {
	return jwt.verify(token, SERVER_ENC_KEY);
}
