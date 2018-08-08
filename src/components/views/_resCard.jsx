import React from "react";
import moment from 'moment';

module.exports = {
  resCard: function (props) {
    return (
      <article className="new-tweet-article" key={`res${props.id}`}>
        <header>
          <h3>Reservation {props.resnum}</h3>
          <h5> {moment.unix(props.starttimeunix).format("MM/DD/YYYY")} / {moment.unix(props.endtimeunix).format("MM/DD/YYYY")} </h5>
        </header>
        <div className="tweet-body">
          <p className="message"></p>
          <p className="">Address : {props.address} </p>
          <p className="">City : {props.city}</p>
          <p className="">Postal Code : {props.postalcode}</p>
          <p className="">Stall #  : {props.stall}</p>
          <p className="">Buzzer #  : {props.buzzer}</p>
        </div>
      </article>
    )
  }
}