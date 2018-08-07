import React from "react";
import moment from 'moment';


module.exports = {

  parkingCard: function (props) {
    return (
      <article className="new-tweet-article" key={`ps${props.id}`}>
        <header>
          <h3>{props.id} </h3>
        </header>
        <div className="tweet-body">
          <img src={props.picture} className="parkingspot-img" />
          <p className="">{props.address}</p>
          <p className="">{props.city}</p>
          <p className="">{props.stall}</p>
          <p className="">{props.maxheight}</p>
          <p className="">{props.description}</p>
        </div>
      </article>
    )
  }

}
