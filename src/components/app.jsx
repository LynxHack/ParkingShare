import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './views/home.jsx';
import Contact from './views/contact.jsx';

export default class App extends Component {
  render() {
    return (
      <Router>
        <div id='main'>
          <div id="header">
            <div id="nav">
              <p id="logo_text">SpotSharer</p>
              <Link to="#" className="nav_links">Log In</Link>
              <Link to="#" className="nav_links">Sign Up</Link>
              <Link to="/contact" className="nav_links">Contact</Link>
              <Link to="#" id="host_link">Share A Spot</Link>
            </div> 
          </div>   
          <Route path="/" component={Home} />
          <Route path="/contact" component={Contact} />
        </div>
      </Router>
    );
  }
}