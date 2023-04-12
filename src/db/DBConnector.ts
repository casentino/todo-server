import fs, { promises } from 'fs';
import { Low, JSONFile } from 'lowdb';
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

async function initDB() {
	const isExistOrFolderPath = fs.existsSync(folderPath);
	if (!isExistOrFolderPath) {
		await fsPromise.mkdir(folderPath);
	}
	const isExistFile = fs.existsSync(filePath);
	if (!isExistFile) {
		await fsPromise.writeFile(filePath, JSON.stringify({ todos: [], users: [] }));
	}
	return filePath;
}

export async function connectDatabase() {
	const filePathName = await initDB();
	db = new Low<DB>(new JSONFile(filePathName));
	await db.read();
}
