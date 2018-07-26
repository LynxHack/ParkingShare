exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('users', function(table){
        table.increments();

        table.string('firstname');
        table.string('lastname');
        table.string('email');
        table.string('password');
        table.integer('telephone');
        table.string('picture');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })

    .createTable('type', function(table){
        table.increments();
        table.string('cartype');
    })

    .createTable('parkingspot', function(table){
        table.increments();
        table.decimal('longitude');
        table.decimal('latitude');
        table.string('picture');
        table.integer('stall');
        table.integer('buzzer');

        table.string('description');
        table.string('address');
        table.string('city');
        table.string('postal code');

        table.integer('maxheight');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        //Foreign Keys
        table.bigInteger('typeid').unsigned().index().references('id').inTable('type');
        table.bigInteger('hostid').unsigned().index().references('id').inTable('users');
    })

    .createTable('vehicles', function(table){
        table.increments();
        table.string('make');
        table.string('model');
        table.string('licenseplate');
        table.string('string');

        //Foreign Key
        table.bigInteger('userid').unsigned().index().references('id').inTable('users');
        table.bigInteger('typeid').unsigned().index().references('id').inTable('type');
    })
    
    .createTable('reviews', function(table){
        table.increments();
        table.decimal('rating');
        table.string('description');
    })

    .createTable('reservations', function(table){
        table.increments();
        table.timestamp('starttime');
        table.timestamp('endtime');

        table.bigInteger('parkingid').unsigned().index().references('id').inTable('parkingspot');
        table.bigInteger('hostid').unsigned().index().references('id').inTable('users');
        table.bigInteger('clientid').unsigned().index().references('id').inTable('users');
    })

    .createTable('messages', function(table){
        table.increments();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('content');

        table.bigInteger('reservationid').unsigned().index().references('id').inTable('reservations');
    });
};

exports.down = function(knex, Promise) {
  return knex.schema

  .dropTable('vehicles')
  .dropTable('reviews')  .dropTable('messages')

  .dropTable('reservations')

  .dropTable('parkingspot')
  .dropTable('type')
  .dropTable('users')
};
