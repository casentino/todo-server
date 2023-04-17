import supertest from 'supertest';
import type { Express } from 'express';
import { createServer } from '../server';
let server: Express;
describe('auth api', () => {
	beforeAll(async () => {
		server = await createServer();
	});
	it('register auth', async () => {
		const res = await supertest(server).post('/auth/register').send({
			email: 'ooo3@gmail.com',
			password: 'qwerasdf123!',
			name: '123123',
		});
		expect(res.status).toBe(200);
		expect(res.body).not.toBeUndefined();
	});
	it('register duplicate', async () => {
		const res = await supertest(server).post('/auth/register').send({
			email: 'ooo3@gmail.com',
			password: 'qwerasdf123!',
			name: '123123',
		});
		expect(res.status).toBe(409);
		expect(res.body.message).toBe('이미 존재하는 이메일입니다.');
	});
	describe('login auth test', () => {
		test('login auth', async () => {
			const res = await supertest(server).post('/auth/signin').send({
				email: 'ooo3@gmail.com',
				password: 'qwerasdf123!',
			});
			expect(res.status).toBe(200);
			expect(res.body.user).not.toBeUndefined();
			expect(res.body.token).not.toBeUndefined();
		});

		test('email invalid', async () => {
			const res = await supertest(server).post('/auth/signin').send({
				email: 'ekwndlwk',
				password: 'weee1',
			});
			expect(res.status).toBe(400);
			expect(res.body.message).toBe('유효하지 않은 이메일 형식입니다.');
		});
		test('password invalid', async () => {
			const inValidLength = await supertest(server).post('/auth/signin').send({
				email: 'ooo3@gmail.com',
				password: '1',
			});
			expect(inValidLength.status).toBe(400);
			expect(inValidLength.body.message).toBe('비밀번호는 최소 8글자 입니다.');
			const inValidFormat = await supertest(server).post('/auth/signin').send({
				email: 'ooo3@gmail.com',
				password: 'dlfdltkatkdhdbr',
			});
			expect(inValidFormat.status).toBe(400);
			expect(inValidFormat.body.message).toBe('비밀번호는 특수문자, 숫자, 알파벳이 포함되어야 합니다.');
		});
	});
});
