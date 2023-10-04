import { Request, Response } from 'express';
import { find, findAll, create, update } from '../services/todo';

const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await find(id);
    res.json(todo);
  } catch (err) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log('Unkown error');
    }
  }
};

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await findAll();
    res.json(todos);
  } catch (err) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log('Unkown error');
    }
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await create(description);
    res.json(newTodo);
  } catch (err) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log('Unkown error');
    }
  }
};

const updateTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await update(id, description);
    res.json(todo);
  } catch (err) {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      console.log('Unkown error');
    }
  }
};

export { getTodoById, getAllTodos, createTodo, updateTodoById };
