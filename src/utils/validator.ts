import { JwtPayload } from 'jsonwebtoken';
import User from '../model/User';

export function isEmail(email: string) {
	const regex =
		/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	const isValid = regex.test(email);
	return {
		isValid,
		...(!isValid ? { message: '유효하지 않은 이메일 형식입니다.' } : {}),
	};
}
export function isPasswordValid(password: string) {
	//  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
	const regex = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
	const isValid = regex.test(password);
	let message = '비밀번호는 특수문자, 숫자, 알파벳이 포함되어야 합니다.';
	if (!isValid) {
		if (password.length < 8) {
			message = '비밀번호는 최소 8글자 입니다.';
		}
	}
	return {
		isValid,
		...(!isValid ? { message } : {}),
	};
}

export function loginValidation(email: string, password: string) {
	const validationEmail = isEmail(email);
	if (!validationEmail.isValid) {
		return {
			...validationEmail,
		};
	}
	const validationPassword = isPasswordValid(password);
	if (!validationPassword.isValid) {
		return {
			...validationPassword,
		};
	}
	return {
		isValid: true,
	};
}
export function parseObj(jwt: string | JwtPayload | undefined): JwtPayload {
	if (!jwt) return {};

	if (typeof jwt === 'string') {
		let obj;
		try {
			obj = JSON.parse(jwt);
		} catch (err) {
			return {};
		}
		if (typeof obj === 'object') {
			return obj;
		}
		return {};
	}

	return jwt;
}
export function isUser(payload: string | JwtPayload | undefined): payload is User {
	const user = parseObj(payload);
	if ('_id' in user && 'email' in user && 'name' in user) {
		return true;
	}

	return false;
}
