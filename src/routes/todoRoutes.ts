import express from 'express';
import { todoController } from '../controller';
import { extractUserInfo, validateToken } from '../middlewares/tokenMiddleware';
const router = express.Router();
router.use(validateToken);
router.use(extractUserInfo);
router.get('/', todoController.getTodos);
router.post('/', todoController.createTodo);
router.get('/:id', todoController.getTodoById);
router.put('/:id', todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

export default router;
