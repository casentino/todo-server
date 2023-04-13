import { db } from '../db/DBConnector';
import Todo from '../model/Todo';

export function findUserTodos(createdById: string) {
	if (!db.data) return [];

	return db.data.todos.filter((todo) => todo.createdBy === createdById);
}

export function findTodo(id: string, createdBy: string) {
	if (!db.data) return;
	return db.data.todos.find((todo) => todo.id === id && todo.createdBy === createdBy);
}

export async function createTodo(todo: Todo) {
	if (!db.data) return;
	db.data.todos.push(todo);

	await db.write();
	return todo;
}

export async function updateTodo(todoId: string, todo: Todo) {
	if (!db.data) return;
	const findedTodo = db.data.todos.find((todo) => todo.id === todoId);
	if (!findedTodo) return;
	const { title, content, checked } = todo;
	Object.assign(findedTodo, { title, content, checked });
	await db.write();
	return findedTodo;
}

export async function deleteTodo(todoId: string, createdBy: string) {
	if (!db.data) return;
	let deletedTodo: Todo | undefined;
	const todos = db.data.todos.filter((todo) => {
		if (todo.createdBy !== createdBy) {
			return true;
		}
		if (todo.id === todoId) {
			deletedTodo = todo;
			return false;
		}
		return true;
	});
	if (!deletedTodo) return;

	db.data.todos = todos;
	await db.write();

	return deletedTodo;
}
