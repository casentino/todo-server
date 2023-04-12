import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SERVER_ENC_KEY } from '../config';
import { isUser } from '../utils/validator';

export function validateToken(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.sendStatus(401);
	}
	const token = authorization.split(' ')[1];
	jwt.verify(token, SERVER_ENC_KEY, (err, user) => {
		if (err) {
			return res.status(403).send({
				statusCode: 403,
				message: 'InValidation Token',
			});
		}

		next();
	});
}

export function extractUserInfo(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.sendStatus(401);
	}
	const token = authorization.split(' ')[1];
	jwt.verify(token, SERVER_ENC_KEY, (err, user) => {
		if (err) {
			return res.status(403).send({
				statusCode: 403,
				message: 'InValidation Token',
			});
		}

		if (isUser(user)) {
			req.parsedUsr = user;
		}
		next();
	});
}
