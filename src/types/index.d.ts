import User from '../model/User';
/// <reference types="node" />

declare global {
	export namespace Express {
		export interface Request {
			parsedUsr: User;
		}
	}
}
