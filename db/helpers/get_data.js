"use strict"

const ENV = process.env.NODE_ENV || "development";
const knexConfig = require("./../../knexfile");
const knex = require("knex")(knexConfig[ENV]);
var bcrypt = require('bcryptjs');

module.exports = {
  getAvailableSpots: function() {
    return new Promise((resolve, reject) => {
      knex('parkingspots')
      .then((result) => {
        if (result){
          return resolve(result);
        }
        reject('Error in finding data in table parkingspots');
      })
    })
  }
}