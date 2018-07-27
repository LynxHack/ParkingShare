exports.seed = function(knex, Promise) {
  return knex('vehicles').del()
    .then(function () {
      return Promise.all([
        knex('vehicles').insert({make: 'BMW',model: 'X6',licenseplate: '123-456', color: 'black'}),
        knex('vehicles').insert({make: 'Honda',model: 'Civic',licenseplate: '456-789', color: 'white'}),
        knex('vehicles').insert({make: 'Dogde',model: 'Ram',licenseplate: '123-000', color: 'red'}),
      ]);
    });
};
