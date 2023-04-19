import './config/env';
import app from './app';
import { connectDatabase } from './db/DBConnector';

export async function createServer() {
	await connectDatabase();
	return app;
}
