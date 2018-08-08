import React from "react";
import moment from 'moment';


module.exports = {

  parkingCard: function (props) {
    return (
      <article className="new-tweet-article" key={`ps${props.id}`}>
        <header>
          <h3>{props.address}</h3>
        </header>
        <div className="tweet-body">
          <p className="">City : {props.city}</p>
          <p className="">Stall #{props.stall}</p>
    <p className="">Max Height : {props.maxheight} inches </p>
          <p className="">Description : {props.description}</p>
        </div>
      </article>
    )
  }

}
