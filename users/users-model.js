const db = require('../database/config');

function add(campaign) {
    return db('users')
        .insert(campaign, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

function findById(id) {
    return db('users').select('id', 'name', 'email', 'age', 'password').where({id}).first();
}

function findBy(filter) {
    return db('users').select('id', 'name', 'email', 'age', 'password').where(filter);
}

function find() {
    return db('users').select('id', 'name', 'email', 'age', 'password');
}

function remove(id) {
    return db('users').where({id}).del();
}

function update(id, changes) {
    return db('users').where({id}).update(changes).select('*');
}

module.exports = {
    add,
    findById,
    findBy,
    find,
    remove,
    update
}