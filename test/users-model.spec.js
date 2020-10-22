const db = require('../database/config.js');
const Users = require('../auth/auth-model');

describe('users model', () => {
    describe('insert', () => {
        beforeEach(async ()=>{
            await db('users').truncate();
        });

        it('insert provided character into db', async () => {
            await Users.add({username: 'nicopico', password: 'hello', age: 30, email: 'nicochikuji@gmail.com'});
            const users = await db('users');
            expect(users).toHaveLength(1);
            expect(users[0].username).toBe('nicopico')
        });
        it('provide length of users', async () => {
            await Users.add({username: 'nicopico', password: 'hello', age: 30, email: 'nicochikuji@gmail.com'});
            await Users.find(1);
            const users = await db('users');
            expect(users).toHaveLength(1)
        });
        it('find user based on id', async () => {
            await Users.add({username: 'nicopico', password: 'hello', age: 30, email: 'nicochikuji@gmail.com'});
            await Users.findById(1);
            const users = await db('users')
            expect(users[0].username).toBe('nicopico');
        });
    })
})