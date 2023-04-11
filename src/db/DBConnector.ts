import fs from 'fs/promises';
import { Low, JSONFile } from 'lowdb';
import path from 'path';
import Todo from '../model/Todo';
import User from '../model/User';
const __dirname = path.resolve();
const folderPath = `${__dirname}/db`;
const filePath = `${folderPath}/db.json`;

type DB = {
	todos: Todo[];
	users: User[];
};

export let db: Low<DB>;

async function isExistFolder(path: string) {
	try {
		return await fs.readdir(path);
	} catch (err) {
		return false;
	}
}

async function isExistFilePath(path: string) {
	try {
		return !(await fs.readdir(path));
	} catch (err) {
		return false;
	}
}
async function initDB() {
	const isExistOrFolderPath = await isExistFolder(folderPath);
	if (!isExistOrFolderPath) {
		await fs.mkdir(folderPath);
	}
	const isExistFile = await isExistFilePath(filePath);
	if (!isExistFile) {
		await fs.writeFile(filePath, JSON.stringify({ todos: [], users: [] }));
	}
	return filePath;
}

export async function connectDatabase() {
	const filePathName = await initDB();
	const low = new Low<DB>(new JSONFile(filePathName));
	db = low;
	await db.read();
}
