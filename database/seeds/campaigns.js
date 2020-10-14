
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('campaigns').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('campaigns').insert([
        {name: 'Project X', user_id: 1}
      ]);
    });
};
