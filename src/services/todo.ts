import { getDb } from '../db';

interface Todo {
  todo_id: string;
  description: string;
}

const find = async (id: string): Promise<Todo> => {
  const pool = getDb();
  const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1;', [id]);
  if (!todo.rowCount) throw new Error('Todo not found');
  return todo.rows[0];
};

const findAll = async () => {
  const pool = getDb();
  const todos = await pool.query('SELECT * FROM todo;');
  return todos;
};

const create = async (description: string) => {
  const pool = getDb();
  try {
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES($1) RETURNING *', [description]);
    return newTodo.rows[0];
  } catch (error) {
    console.error(error);
  }
};

const update = async (id: string, description: string) => {
  const pool = getDb();
  const todo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2 ;', [description, id]);
  if (!todo.rowCount) throw new Error('Todo not found');
  return todo.rows[0];
};

export { find, findAll, create, update };
