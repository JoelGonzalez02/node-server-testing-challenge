exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('players').del()
    .then(function () {
      // Inserts seed entries
      return knex('players').insert([
        {name: 'Lebron James', number: 23 , position: 'Point Guard/Small Forward', role: 'Superstar player'},
        {name: 'Anthony Davis', number: 3 , position: 'PowerForward/Center', role: 'Superstar player'},
        {name: 'Kyle Kuzma', number: 0, position: 'Power Forward/Small Forward', role: '3rd star/X factor'}
      ]);
    });
};