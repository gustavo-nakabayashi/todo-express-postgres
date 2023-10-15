const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const axiosConfig = {
  baseURL: `http://127.0.0.1:${process.env.PORT}`,
  validateStatus: () => true, //Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
};
const axiosAPIClient = axios.create(axiosConfig);

describe('/todos', () => {
  describe('POST', () => {
    test('Should return 200', async () => {
      // Arrange
      const todoToAdd = { description: 'teste' };
      // Act
      const {
        data: { todo_id: addedOrderId },
      } = await axiosAPIClient.post('/todos', todoToAdd);
      // Assert
      const { data, status } = await axiosAPIClient.get(`/todos/${addedOrderId}`);
      expect({ data, status }).toMatchObject({ data: { todo_id: addedOrderId, description: 'teste' }, status: 200 });
    });
    test('Should return 400 if payload invalid', async () => {
      // Arrange
      const todoToAdd = {};
      // Act
      const { status } = await axiosAPIClient.post('/todos', todoToAdd);
      // Assert
      expect(status).toBe(400);
    });
  });

  describe('GET', () => {
    test('Should return added todo', async () => {
      // Arrange
      const uniqueDescription = new Date().getTime().toString();
      const todoToAdd = { description: uniqueDescription };
      await axiosAPIClient.post('/todos', todoToAdd);
      // Act
      const response = await axiosAPIClient.get('/todos');
      // Assert
      const { status, data } = response;
      const addedTodo = data.rows.filter((todo) => todo.description == uniqueDescription)[0];
      expect(status).toEqual(200);
      expect(addedTodo).toHaveProperty('description', uniqueDescription);
    });
  });

  describe('/:id', () => {
    describe('GET', () => {
      test('Should return a todo by id', async () => {
        // Arrange
        const uniqueDescription = new Date().getTime().toString();
        const todoToAdd = { description: uniqueDescription };
        const addedTodo = await axiosAPIClient.post('/todos', todoToAdd);
        const { todo_id } = addedTodo.data;
        // Act
        const response = await axiosAPIClient.get(`/todos/${todo_id}`);
        // Assert
        const { status, data } = response;
        expect(status).toEqual(200);
        expect(data).toHaveProperty('todo_id', todo_id);
      });
      test('Should 404 if todo not found', async () => {
        // Arrange
        // Act
        const response = await axiosAPIClient.get(`/todos/0`);
        // Assert
        const { status } = response;
        expect(status).toEqual(404);
      });
    });

    describe('PUT', () => {
      test('Should return update a todo by id', async () => {
        // Arrange
        const uniqueDescription = new Date().getTime().toString();
        const todoToAdd = { description: uniqueDescription };
        const addedTodo = await axiosAPIClient.post('/todos', todoToAdd);
        const { todo_id } = addedTodo.data;
        // Act
        const updatedResponse = await axiosAPIClient.put(`/todos/${todo_id}`, { description: 'updated' });
        const response = await axiosAPIClient.get(`/todos/${todo_id}`);
        // Assert
        const { data } = response;
        const { status } = updatedResponse;
        expect(status).toEqual(200);
        expect(data).toHaveProperty('description', 'updated');
      });

      test('Should 404 if todo not found', async () => {
        // Arrange
        const dataToUpdate = { description: 'updated' };
        // Act
        const response = await axiosAPIClient.put(`/todos/0`, dataToUpdate);
        // Assert
        const { status } = response;
        expect(status).toEqual(404);
      });

      test('Should return 400 if payload invalid', async () => {
        // Arrange
        const uniqueDescription = new Date().getTime().toString();
        const todoToAdd = { description: uniqueDescription };
        const addedTodo = await axiosAPIClient.post('/todos', todoToAdd);
        const { todo_id } = addedTodo.data;
        const dataToUpdate = {};
        // Act
        const { status } = await axiosAPIClient.put(`/todos/${todo_id}`, dataToUpdate);
        // Assert
        expect(status).toEqual(400);
      });
    });
  });
});
