const server = require('../api/server');
const request = require('supertest');

describe('server.js', () => {
    describe('get /', () => {
        it('should return 200 ok', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        });
        it('should return a json', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });
        it('should return the right object', async () => {
            const res = await request(server).get('/');
            expect(res.body).toStrictEqual({api: 'up and running!'})
        });
    });
});