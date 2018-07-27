exports.seed = function(knex, Promise) {
  return knex('reviews').del()
    .then(function () {
      return Promise.all([
        knex('reviews').insert({rating: 3.5 ,description: 'This parking spot was very croweded bt in a good location.'}),
        knex('reviews').insert({rating: 5.0 ,description: 'Great location, would park here again.'}),
      ]);
    });
};
