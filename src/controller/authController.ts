import { Request, Response } from 'express';
import { RequestPayload } from '../types';
import { loginValidation } from '../utils/validator';
import { authService } from '../service';
import { genJWTToken } from '../utils/authUtils';
import { SignUpRequest } from '../model/User';
import { findUser, register } from '../service/authService';

export function authSignIn(req: RequestPayload<{ email: string; password: string }>, res: Response) {
	const { email, password } = req.body;
	const { isValid, message } = loginValidation(email, password);
	if (!isValid) {
		return res.status(400).send({ message });
	}

	const findedUser = authService.findUser((user) => user.email === email && password === user.password);
	if (!findedUser) {
		return res.status(500).send({ message: '로그인을 실패했습니다.' });
	}
	return res.status(200).send({
		user: findedUser,
		token: genJWTToken(findedUser),
	});
}

export async function authRegister(req: RequestPayload<SignUpRequest>, res: Response) {
	const { email, password, name } = req.body;
	const { isValid, message } = loginValidation(email, password);
	if (!isValid) {
		return res.status(400).send({ message });
	}
	const isExistUser = findUser((user) => user.email === email);
	if (isExistUser) {
		return res.status(409).send({
			message: '이미 존재하는 이메일입니다.',
		});
	}
	const signupUser = await register({ email, password, name });
	if (!signupUser) {
		return res.status(500).send({
			message: 'Internal Server Error',
		});
	}
	return res.status(200).send({
		user: signupUser,
	});
}

export function logout(req: Request, res: Response) {}
