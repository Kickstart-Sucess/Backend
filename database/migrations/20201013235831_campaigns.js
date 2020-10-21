
exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
        table.increments('id');
        table.string('username').notNull().unique();
        table.string('password').notNull();
        table.integer('age').notNull();
        table.text('email').notNull().unique();
    })

    .createTable('campaigns', table => {
        table.increments('id');
        table.text('name').notNull();
        table.integer('user_id').notNull();
        table.text('imageURL').notNull();
    })

    .createTable('metrics', table => {
        table.increments('id');
        table.integer('campaign_id')
            .unsigned()
            .notNull()
            .references('id')
            .inTable('campaigns')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('monetary_goal')
            .notNull();
        table.text('description')
            .notNull();
        table.integer('campaign_length')
            .notNull();
        table.text('category')
            .notNull();    
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users')
                    .dropTableIfExists('campaigns')
                    .dropTableIfExists('metrics');
};
