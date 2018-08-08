import React from "react";
import moment from 'moment';

module.exports = {
  vehicle: function (props) {
    console.log("these are our vehicles" , props)
    return (
     
        <article class="new-tweet-article">
        <header>
          <h3>Vehicle ID: </h3>
  
       </header>
        <div class="tweet-body">
        <p class ="message">     
         <p class ="">Make : {props.make}</p>
        <p class ="">Model : {props.model}</p>
        <p class ="">Color : {props.color}</p>
        <p class ="">License Plate : {props.licenseplate}</p>
        </p>
        </div>
      </article>
    )
  }
}