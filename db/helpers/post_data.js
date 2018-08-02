"use strict"

const ENV         = process.env.NODE_ENV || "development";
const knexConfig  = require("./../../knexfile");
const knex        = require("knex")(knexConfig[ENV]);
var bcrypt = require('bcryptjs');
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
    },

    checkcredentials: function(email, password) {
        return new Promise((resolve, reject) => {
            knex('users').where({email: email})
            .then((result) => {
                if(result.length > 1){
                    throw new Error("Error: There are duplicate emails in database!")
                }  
                const data = result[0]; //take first and only result
                console.log(data);
                //// need seeded data s
                bcrypt.compare(password, data.password, function(err, res) {
                    if(res){
                        console.log("passed bcrypt auth")
                        console.log(result);
                        resolve(result);   
                    }
                    else{
                        console.log("failed bcrypt auth")
                        reject("No user found with credentials given");
                    }
                });
            })
            .catch((err) => {
                console.log(err); 
                return null;
            })
        })        
    },

    checkid: function(id) {
        return new Promise((resolve, reject) => {
            if(id){
                knex('users').where({id: id})
                .then((result) => {
                    resolve(result);   
                })
                .catch((err) => {
                    console.log(err); 
                    reject(err);
                })
            }
            else{
                reject("No user exist in such an id value")
            }
        })     
    },

    registerUser: function(formdata){
        //insert user in if there is not already an identical email
        knex('users')
        .where({email: formdata.email})
        .then((result) => {
            if(result.length === 0){ 
                bcrypt.hash(formdata.password, 10, function(err, hash) {
                    knex('users')
                    .insert({
                        firstname: formdata.firstname,
                        lastname: formdata.lastname,
                        email: formdata.email,
                        password: hash,
            
                        telephone: formdata.telephone,
                        picture: formdata.picture
                    })
                    .then((response) => {
                        console.log(response, "Successfully inserted new user");
                    })
                });
            }
            else{
                console.log("user not created since there is a duplicate email in db")
            }
        })
    }
}
