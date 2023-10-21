import { Request, Response } from 'express';
import { find, findAll, create, update } from '../services/todo';
import Joi from 'joi';

const getTodoById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await find(id);
    res.json(todo);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'Todo not found') {
        res.status(404).send(err.message);
      } else {
        res.status(500).send(err.message);
      }
    } else {
      console.log('Unkown error');
    }
  }
};

const getAllTodos = async (req: Request, res: Response) => {
  try {
    const todos = await findAll(req.body.user_id);
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
  const schema = Joi.object({
    description: Joi.string().required(),
    user_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const { description, user_id } = req.body;
    const newTodo = await create(description, user_id);
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
  const schema = Joi.object({
    description: Joi.string().required(),
    user_id: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log('error', error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  try {
    const { id } = req.params;
    const { description } = req.body;
    const todo = await update(id, description);
    res.json(todo);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message === 'Todo not found') {
        res.status(404).send(err.message);
      } else {
        res.status(500).send(err.message);
      }
    } else {
      console.log('Unkown error');
    }
  }
};

export { getTodoById, getAllTodos, createTodo, updateTodoById };
