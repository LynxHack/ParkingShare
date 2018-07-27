// src/shared/App.js

import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="main">
        <img src="https://s5.postimg.cc/qqgj4taev/logo.png" id="logo" />
        <ul>
          <li>
            <a href="default.asp">Home</a>
          </li>
          <li>
            <a href="news.asp">News</a>
          </li>
          <li>
            <a href="contact.asp">Contact</a>
          </li>
          <li>
            <a href="about.asp">About</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default App;
