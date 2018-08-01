"use strict"

const ENV         = process.env.NODE_ENV || "development";
const knexConfig  = require("./../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {
    insertNewSpot : function(formdata){
        console.log(formdata);
        knex('parkingspots')
        .insert({
            longitude: formdata.longitude,
            latitude: formdata.latitude,
            picture: formdata.picture, 
            stall: formdata.stall, 
            buzzer: formdata.buzzer, 
            description: formdata.description, 
            address : formdata.address, 
            city: formdata.city, 
            postalcode : formdata.postalcode, 
            maxheight : formdata.maxheight
        })
        .then( function(result){
            res.json({success: true, message: 'ok'});
        })
    }
}
