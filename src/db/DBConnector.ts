import fs, { promises } from 'fs';
import { Low, JSONFile, Adapter, Memory } from 'lowdb';
import path from 'path';
import Todo from '../model/Todo';
import User from '../model/User';
const fsPromise = promises;
const __dirname = path.resolve();
const folderPath = `${__dirname}/db`;
const filePath = `${folderPath}/db.json`;

type DB = {
	todos: Todo[];
	users: User[];
};
export let db: Low<DB>;

export async function initDB() {
	const isExistOrFolderPath = fs.existsSync(folderPath);
	if (!isExistOrFolderPath) {
		await fsPromise.mkdir(folderPath);
	}
	const isExistFile = fs.existsSync(filePath);
	if (!isExistFile) {
		await fsPromise.writeFile(filePath, JSON.stringify({ todos: [], users: [] }));
	}
}

export async function connectDatabase() {
	let adapter: Adapter<DB>;
	if (process.env.NODE_ENV === 'test') {
		adapter = new Memory<DB>();
	} else {
		await initDB();
		adapter = new JSONFile<DB>(filePath);
	}

	db = new Low<DB>(adapter);
	await db.read();
	if (!db.data) {
		db.data = { todos: [], users: [] };
	}
	await db.write();
}
