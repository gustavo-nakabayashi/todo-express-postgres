import { Request, Response, RequestHandler } from 'express';
import { find, findAll, create, update } from '../services/todo';
import Joi from 'joi';

type Todo = {
  description: string;
};

const getTodoById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const id = req.params.id;
    const { userId } = req.user;
    const todo = await find(id, userId);
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

const getAllTodos: RequestHandler = async (req, res) => {
  try {
    const todos = await findAll(req.user.userId);
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

const createTodo: RequestHandler = async (req, res) => {
  const schema = Joi.object({
    description: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json(error.details[0].message);
  }

  try {
    const { userId } = req.user;
    const { description } = <Todo>req.body;
    const newTodo = await create(description, userId);
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

const updateTodoById: RequestHandler<{ id: string }> = async (req, res) => {
  const schema = Joi.object({
    description: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    console.log('error', error.details[0].message);
    return res.status(400).json(error.details[0].message);
  }

  try {
    const { id } = req.params;
    const { description } = <Todo>req.body;
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
