require('./../../stylesheets/home.scss');

import React, { Component } from "react";

export default class Home extends Component {

  render() {
    return (
      <div id="welcome_text_div">
        <h1>Welcome To Your Spot</h1>
        <p>Rent out uninque parking spots all around the greatest city in the world.</p>

        <form class="search-container"/>
        <input type="text" id="search-bar" placeholder="What can I help you with today?"/>
        <a href="#"><img class="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"/></a>
      
      </div>
    );
  }
}