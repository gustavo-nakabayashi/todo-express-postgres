import { Router } from 'express';
import { getTodoById, getAllTodos, createTodo, updateTodoById } from './controllers/todo';

const router = Router();

router.get('/todos/:id', getTodoById);
router.get('/todos', getAllTodos);
router.post('/todos', createTodo);
router.put('/todos/:id', updateTodoById);

export default router;
