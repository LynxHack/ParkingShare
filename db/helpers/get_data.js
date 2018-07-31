"use strict"

const ENV = process.env.NODE_ENV || "development";
const knexConfig = require("./../../knexfile");
const knex = require("knex")(knexConfig[ENV]);

module.exports = {

// MapBox boundsObject{…}
// ​{ _ne: {  lng: -113.434402221679, 
//           lat: 53.54671775460872 },
//   _sw: {  lng: -113.57859777831973, 
//           lat: 53.52207866110649 }}
  getAvailableSpots: function(boundsObject) {
    return new Promise((resolve, reject) => {
      knex('parkingspots')
      .where('longitude', '<=', boundsObject._sw.lng)
      .andWhere('longitude', '>=', boundsObject._ne.lng)
      .andWhere('latitude', '<=', boundsObject._ne.lat)
      .andWhere('latitude', '>=', boundsObject._sw.lat)
      .then((result) => {
        if (result){
          return resolve(result);
        }
        reject('Error in finding data in table parkingspots');
      })
    })
  }
}