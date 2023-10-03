const axios = require('axios')

const axiosConfig = {
  baseURL: `http://127.0.0.1:${apiConnection.port}`,
  validateStatus: () => true, //Don't throw HTTP exceptions. Delegate to the tests to decide which error is acceptable
};
axiosAPIClient = axios.create(axiosConfig);

describe('/POST /todos', () => {
  test('Should return 200', async () => {
    // Arrange


    // Act
    const response = await axios.post("http://localhost:5000/todos", { description: 'teste' })
    // Assert
    const { status, data } = response
    expect(status).toEqual(200)
    expect(data).toHaveProperty('description', 'teste')
  })
})
