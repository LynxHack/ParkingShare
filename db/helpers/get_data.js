"use strict"

const ENV = process.env.NODE_ENV || "development";
const knexConfig = require("./../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
const moment = require('moment');
var bcrypt = require('bcryptjs');

// not sure if this works
function uniq(a) {
  var seen = {};
  return a.filter(function(item) {
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
}

function removeBookedSpots(bookings, parkingspots) {
  let spots = parkingspots
  for (const i of bookings) {
    for (const j of spots) {
      if (i.parkingid == j.id) {
        spots.splice(spots.indexOf(j), 1)
      }
    }
  }
  return spots
}

module.exports = {
  getAvailableSpots: function(startTimeUNIX, endTimeUNIX) {
    // Debugging to verify filter is working
    console.log(`******************************STARTTIME = ${startTimeUNIX} ///// ENDTIME = ${endTimeUNIX}******************************`);

    return new Promise((resolve, reject) => {
      let promisedReservations = knex('reservations')
        .where('starttimeunix', '<', endTimeUNIX)
        .andWhere('endtimeunix', '>', startTimeUNIX)
        .then(function(result) {
          return result
        })
      let promisedParkingSpots = knex('parkingspots')

      Promise.all([promisedReservations, promisedParkingSpots])
        .then(values => {
          return resolve(removeBookedSpots(values[0], values[1]));
        })
        .catch((error) => {
          reject(`Error in finding data ${error}`);
        })
    })
  }
}