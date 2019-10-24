let app = require('../server.js')
let testServer = require('supertest')

describe('Test authentication when logged out', () => {
    test('should respond 403 when logged out', async () => {
        const response = await testServer(app).get('/database');
        expect(response.statusCode).toBe(403);
    })

    // test('Test post new club', async () => {
    //    const response = await testServer(app).post('/database')
    //    expect(response.statusCode).rejects.toThrow(500);
    // });
})