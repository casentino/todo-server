import cors from 'cors';
import express from 'express';
import userRouter from './routes/userRoutes';
import todoRouter from './routes/todoRoutes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/user', userRouter);
app.use('/todo', todoRouter);

app.use((req, res, next) => {
	res.status(404);
	next();
});

export default app;
