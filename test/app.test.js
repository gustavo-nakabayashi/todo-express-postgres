const axios = require('axios')

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
