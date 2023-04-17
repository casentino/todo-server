import supertest from 'supertest';
import type { Express } from 'express';
import { createServer } from '../server';
import Todo from '../model/Todo';
import User from '../model/User';

type MethodTypes = 'get' | 'post' | 'put' | 'delete';
function createRequest(url: string, mothod: MethodTypes, token: string) {
	return supertest(server)
		[mothod](url)
		.set({
			authorization: `Bearer ${token}`,
		});
}
let server: Express;
let token: string;
let todo: Todo;
let user: User;
describe('todo test', () => {
	beforeAll(async () => {
		server = await createServer();
		const res = await supertest(server).post('/auth/register').send({
			email: 'abc@gmail.com',
			password: 'qwerasdf123!',
			name: 'abs',
		});
		const login = await supertest(server).post('/auth/signin').send({
			email: 'abc@gmail.com',
			password: 'qwerasdf123!',
		});
		token = login.body.token;
		user = login.body.user;
	});
	test('todo create', async () => {
		const res = await createRequest('/todo', 'post', token).send({
			title: 'some todo',
			content: 'create todo',
		});

		expect(res.status).toBe(200);
		expect(res.body.todo).not.toBeUndefined();
		expect(res.body.todo).toHaveProperty('id');
		expect(res.body.todo).toHaveProperty('title');
		expect(res.body.todo).toHaveProperty('content');
		expect(res.body.todo).toHaveProperty('checked');
		expect(res.body.todo).toHaveProperty('createdBy');

		const createTodo = res.body.todo as Todo;
		const findAll = await createRequest('/todo', 'get', token);
		expect(findAll.status).toBe(200);
		expect(findAll.body.todos).not.toBeUndefined();
		expect(findAll.body.todos.length).toBe(1);
		expect(findAll.body.todos).toContainEqual(createTodo);
		todo = createTodo;
	});

	test('getTodoById', async () => {
		const res = await createRequest(`/todo/${todo.id}`, 'get', token);
		expect(res.status).toBe(200);
		expect(res.body.todo).not.toBeUndefined();
	});
	test('update todo', async () => {
		const { id } = todo;
		const res = await createRequest(`/todo/${id}`, 'put', token).send({
			todo: {
				...todo,
				title: 'update todo',
			},
		});
		expect(res.status).toBe(200);
		expect(res.body.todo).not.toBeUndefined();
		const { title: prevTodoTitle, ...prev } = todo;
		const { title, ...updateTodo } = res.body.todo;
		expect(prevTodoTitle).not.toEqual(title);
		expect(prev).toEqual(updateTodo);
	});
	test('delete todo', async () => {
		const res = await createRequest('/todo', 'post', token).send({
			title: 'should delete',
			content: 'should delete',
		});

		expect(res.status).toBe(200);
		expect(res.body.todo).not.toBeUndefined();
		expect(res.body.todo).toHaveProperty('id');
		expect(res.body.todo).toHaveProperty('title');
		expect(res.body.todo).toHaveProperty('content');
		expect(res.body.todo).toHaveProperty('checked');
		expect(res.body.todo).toHaveProperty('createdBy');
		expect(res.body.todo.createdBy).toBe(user._id);

		const deleteReq = await createRequest(`/todo/${res.body.todo.id}`, 'delete', token);
		expect(deleteReq.status).toBe(200);

		const findAll = await createRequest('/todo', 'get', token);
		expect(findAll.status).toBe(200);
		expect(findAll.body).toHaveProperty('todos');
		expect(findAll.body.todos).toBeInstanceOf(Array);
		expect(findAll.body.todos).not.toContainEqual(res.body.todo);
	});
});
