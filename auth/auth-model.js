const db = require('../database/config');

function find() {
    return db('users').select('id', 'username', 'password').orderBy('id');
}

function findBy(filter) {
    return db('users').select('id', 'username', 'password').where(filter);
}

function add(user) {
    return db("users")
        .insert(user, "id")
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function findById(id) {
    return db('users').select('id', 'username').where({id}).first();
} 

module.exports = {
    find, 
    findBy,
    add,
    findById
}