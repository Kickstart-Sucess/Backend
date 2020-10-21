
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('campaigns').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('campaigns').insert([
        {name: 'Project X', user_id: 1, imageURL: 'https://www.comtix.com/wp-content/uploads/2019/08/elections-campaign-1024x791.jpg'}
      ]);
    });
};
