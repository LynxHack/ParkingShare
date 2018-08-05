import React from 'react';

module.exports = {
  clickMe: function (id) {
    return <div>
      <h3>${marker.properties.address}</h3>
      <p>${marker.properties.description}</p>
      <button id={id} onclick={console.log('clicked')} type="button" class="btn btn-primary">Primary</button>
    </div>
  }
}