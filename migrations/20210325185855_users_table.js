
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id')
        table.string('username')
        table.timestamp('created_at')
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
