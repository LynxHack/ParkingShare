import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './views/home.jsx';
import MapContainer from './views/map_container';
import Newspot from './views/newspot';
require('./../stylesheets/app.scss');

export default class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <nav>
            <div>
              <Link to="/"><h1 class="logo">SpotSharer</h1></Link>
            </div>
            <ul>
              <li><Link to="#">Log In</Link></li>
              <li><Link to="#">Sign Up</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/newspot">Share A Spot</Link></li>
            </ul> 
          </nav>   
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={MapContainer} />
          <Route exact path="/newspot" component={Newspot} />
        </main>
      </Router>
    );
  }
}