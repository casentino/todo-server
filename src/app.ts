import cors from 'cors';
import express, { Request, Response, ErrorRequestHandler, NextFunction } from 'express';
import userRouter from './routes/authRoutes';
import todoRouter from './routes/todoRoutes';
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());
app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.use((req, res, next) => {
	res.status(404);
	next(new Error(JSON.stringify({ status: 404, message: 'Not Found.' })));
});
const errorHandler: ErrorRequestHandler = (
	err: Error & { status: number },
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = JSON.parse(err.message);
	return res.status(error.status).send({ message: error.message });
};
app.use(errorHandler);
export default app;
