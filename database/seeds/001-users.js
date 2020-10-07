exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'Moss', password: 'password', department: 'IT'}
  ]);
};
