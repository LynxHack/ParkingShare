import React from "react";

module.exports = {
  vehicle: function (props) {
    return (
      <article className="new-tweet-article" key={`car${props.id}`}>
        <header>
          <h3>Vehicle ID: </h3>

        </header>
        <div className="tweet-body">
          <div className="message">
            <p className="">Make : {props.make}</p>
            <p className="">Model : {props.model}</p>
            <p className="">Color : {props.color}</p>
            <p className="">License Plate : {props.licenseplate}</p>
          </div>
        </div>
      </article>
    )
  }
}