require('./../../stylesheets/home.scss');

import React, { Component } from "react";

export default class Home extends Component {

  render() {
    return (
      <div id="welcome_text_div">
        <h1>Welcome To Your Spot</h1>
        <p>Rent out uninque parking spots all around the greatest city in the world.</p>
      </div>
    );
  }
}