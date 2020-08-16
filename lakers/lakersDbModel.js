const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    add, 
    remove
}

function find() {
    return db('players')
}

function findById(id) {
    return db('players').where({id}).first();
}

function add(player) {
    return db('players').insert(player)
        .then(id => {
            return findById(id[0])
        })
}

function remove(id) {
    return db('players').where({id}).del();
}