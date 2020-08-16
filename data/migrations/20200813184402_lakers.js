
exports.up = function(knex) {
  return knex.schema
    .createTable('players', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable();
        tbl.integer('number').notNullable().unique();
        tbl.string('position').notNullable();
        tbl.string('role');
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('players')
};
