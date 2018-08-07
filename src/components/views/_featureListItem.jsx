import React from 'react';

module.exports = {
  FeatureListItem: function (props) {
    return (
      <div className="list-group-item">
        <a href="">
          <span>
            <img src="http://greport.gru.edu/wp-content/uploads/2013/12/parkingspot.jpg" alt="Image" />
          </span>
          <h5 >{props.properties.address}</h5>
          <small></small>
          <p >{props.properties.description}</p>
          <small>Maxheight:{props.properties.maxheight} inches</small>
        </a>
      </div>
    )
  }
}