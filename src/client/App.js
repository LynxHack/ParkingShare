// src/shared/App.js

import React, { Component } from "react";
require("./app.scss");

class App extends Component {
  render() {
    return (
      <div id='main'>
      <body>
      <div id="header">
        <div id="nav">
            <p id="logo_text">SpotSharer</p>
            <a href="#" class="nav_links">Log In</a>
            <a href="#" class="nav_links">Sign Up</a>
            <a href="#" class="nav_links"></a>
            <a href="#" id="host_link">Share A Spot</a>
        </div> 
      </div>
      <div id="welcome_text_div">
        <p id="welcome_text">Welcome To Your Spot</p>
        <p id="welcome_under_text">Rent out uninque parking spots all around the greatest city in the world.</p>
      </div>     
      </body>
      </div>
    )  
  }
}

export default App;
