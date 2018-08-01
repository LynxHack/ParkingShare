"use strict"

const ENV         = process.env.NODE_ENV || "development";
const knexConfig  = require("./../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);

module.exports = {
    insertNewSpot : function(formdata){
        console.log(formdata);
    }
}