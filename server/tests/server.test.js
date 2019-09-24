let app = require('../server.js')
let testServer = require('supertest')

describe('Test the root database path', () => {
    test('should respond 403 when not logged in', async () => {
        const response = await testServer(app).get('/database');
        expect(response.statusCode).toBe(403);
    })
})