const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const axiosConfig = {
  baseURL: `http://127.0.0.1:${process.env.PORT}`,
  validateStatus: () => true, //Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
};
const axiosAPIClient = axios.create(axiosConfig);

describe('/POST /todos', () => {
  test('Should return 200', async () => {
    // Arrange
    // Act
    const response = await axiosAPIClient.post('/todos', { description: 'teste' });
    // Assert
    const { status, data } = response;
    expect(status).toEqual(200);
    expect(data).toHaveProperty('description', 'teste');
  });
});

describe('/GET /todos', () => {
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
