import type { NextFunction, Request, Response } from 'express';
import { isUser } from '../utils/validator';
import { validJWT, validToken } from '../utils/authUtils';

export async function validateToken(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.sendStatus(401);
	}
	try {
		const isValid = await validJWT(authorization);
		if (isValid) {
			next();
		}
	} catch (err) {
		if (err instanceof Error) {
			return res.status(403).send({ message: err.message });
		}
	}
}

export async function extractUserInfo(req: Request, res: Response, next: NextFunction) {
	const { authorization } = req.headers;
	if (!authorization) {
		return res.sendStatus(401);
	}

	try {
		const decode = await validToken(authorization);
		if (isUser(decode)) {
			req.parsedUsr = decode;
		}
		next();
	} catch (err) {
		if (err instanceof Error) {
			return res.status(403).send({ message: err.message });
		}
	}
}
