
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('metrics').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('metrics').insert([
        {campaign_id: 1, monetary_goal: 1000000, description: 'campaign for making cars fly', campaign_length: 10, category: 'technology'}
      ]);
    });
};
