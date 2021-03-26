exports.up = function (knex) {
    return knex.schema.createTable('comments', function (table) {
        table.increments('id')
        table.string('text')
        table.integer('user_id')
        table.integer('post_id')
        table.timestamp('created_at')

        table.foreign('user_id').references('users.id')
        table.foreign('post_id').references('posts.id')
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('comments')
};
