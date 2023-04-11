import type { Response, Request, NextFunction } from 'express';
import * as todoService from '../service/todoService';
import Todo from '../model/Todo';

export function getTodos(req: Request, res: Response) {
	const { authorization } = req.headers;
	// extract auth info
	const todos = todoService.findUserTodos('');
	if (todos.length === 0) {
		return res.send({ todos });
	}
	return res.status(200).send({ todos });
}

export async function createTodo(
	req: Request<
		any,
		any,
		{
			title: string;
			content: string;
		}
	>,
	res: Response
) {
	const { authorization } = req.headers;
	const { title, content } = req.body;
	if (!title) {
		return res.status(500).send({ message: '유효하지 않은 값입니다.' });
	}
	const todo = await todoService.createTodo({
		id: 1,
		title,
		content,
		checked: false,
		createdBy: '',
	});
	return res.status(200).send({ todo });
}

export function getTodoById(req: Request, res: Response) {}

export function updateTodo(req: Request, res: Response) {}

export function deleteTodo(req: Request, res: Response) {}
