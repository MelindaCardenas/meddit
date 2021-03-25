
exports.up = function(knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments('id')
        table.string('text')
        table.string('user_id')
        table.timestamp('created_at')
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};