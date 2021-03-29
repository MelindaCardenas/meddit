exports.up = function (knex) {
    return knex.schema.createTable('comments', function (table) {
        table.increments('id')
        table.string('text')
        table.integer('user_id')
        table.integer('post_id')
        table.timestamp('created_at').defaultTo(knex.fn.now())

        table.foreign('user_id').references('users.id').onDelete('CASCADE')
        table.foreign('post_id').references('posts.id').onDelete('CASCADE')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('comments')
};
