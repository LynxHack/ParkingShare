exports.seed = function(knex, Promise) {
  return knex('reservations').del()
    .then(function () {
      return Promise.all([
      knex('reservations').insert({starttime: '2018-08-01 10:00:00 -8:00',endtime: '2018-08-01 12:00:00 -8:00'}),
      knex('reservations').insert({starttime: '2018-08-01 14:00:00 -8:00',endtime: '2018-08-01 16:00:00 -8:00'}),
      ]);
    });
};
  