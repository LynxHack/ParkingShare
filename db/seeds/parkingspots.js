exports.seed = function(knex, Promise) {
  return knex('parkingspots').del()
    .then(function () {
      return Promise.all([
      knex('parkingspots').insert({longitude: '-123.1786568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.1686568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.1586568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.1486568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.1386568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.1286568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.1186568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.1086568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.0986568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.0886568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.0786568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.0686568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.0586568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72}),
      knex('parkingspots').insert({longitude: '-123.0486568',latitude: '49.2820076',picture: '../images/kits.png', stall: '11', buzzer: '0000', description: 'The parking spot is located behind the building.', address : '4354 W 10th Ave', city: 'Vancouver', postalcode : 'V6R 2H7', maxheight : 72})
      ]);
    });
};
  