const db = require('../database/config');

function add(campaign) {
    return db('campaigns')
        .insert(campaign, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id);
        })
}

function findById(id) {
    return db('campaigns').select('id', 'name').where({id}).first();
}

function findBy(filter) {
    return db('campaigns').select('id', 'name', 'user_id').where(filter);
}

function find() {
    return db('campaigns').select('id', 'name', 'user_id');
}

function remove(id) {
    return db('campaigns').where({id}).del();
}

function update(id, changes) {
    return db('campaigns').where({id}).update(changes).select('*');
}

module.exports = {
    add,
    findById,
    findBy,
    find,
    remove,
    update
}