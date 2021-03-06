exports.up = function (knex) {
    return knex.schema.createTable('posts', function (table) {
        table.increments('id')
        table.string('text')
        table.integer('user_id')
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.foreign('user_id').references('users.id').onDelete('CASCADE')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('posts')
};
