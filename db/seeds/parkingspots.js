exports.seed = function(knex, Promise) {
  return knex('parkingspots').del()
    .then(function () {
      return Promise.all([
      knex('parkingspots').insert({longitude: '-123.204866',latitude: '49.263466',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      ]);
    });
};
  