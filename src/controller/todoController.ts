import type { Response, Request, NextFunction } from 'express';
import * as todoService from '../service/todoService';
import Todo from '../model/Todo';
import { generateId } from '../utils/genUnique';
import { RequestPayload } from '../types';

export function getTodos(req: Request, res: Response) {
	const { authorization } = req.headers;
	// extract auth info
	const todos = todoService.findUserTodos('');
	return res.status(200).send({ todos });
}

export async function createTodo(req: RequestPayload<{ title: string; content: string }>, res: Response) {
	const { authorization } = req.headers;
	const { title, content } = req.body;
	if (!title) {
		return res.status(500).send({ message: '유효하지 않은 값입니다.' });
	}
	const todo = await todoService.createTodo({
		id: generateId(),
		title,
		content,
		checked: false,
		createdBy: '',
	});
	return res.status(200).send({ todo });
}

export function getTodoById(req: Request, res: Response) {
	const { id } = req.query;
	console.log(id);
	const { authorization } = req.headers;
	if (!id || typeof id !== 'string') {
		return res.status(400).send({
			message: 'in valide id',
		});
	}
	const findTodo = todoService.findTodo(id);
	if (!findTodo) {
		return res.status(400).send({
			message: '존재하지 않는 todo 입니다.',
		});
	}
	return res.status(200).send({
		todo: findTodo,
	});
}

export async function updateTodo(req: Request<any, any, { todo: Todo }>, res: Response) {
	const { id } = req.query;
	const { todo } = req.body;
	if (!id || typeof id !== 'string') {
		return res.send({
			message: 'in valide id',
		});
	}
	const updated = await todoService.updateTodo(id, todo);
	if (!updated) {
		return res.send({
			message: 'failed update',
		});
	}
	return res.status(200).send({
		todo: updated,
	});
}

export async function deleteTodo(req: Request, res: Response) {
	const { id } = req.query;
	if (!id || typeof id !== 'string') {
		return res.send(400).send({
			message: 'in valide id',
		});
	}
	const deleted = await todoService.deleteTodo(id);
	if (!deleted) {
		return res.send({
			message: 'failed delete',
		});
	}
	return res.send({
		todo: deleted,
	});
}
