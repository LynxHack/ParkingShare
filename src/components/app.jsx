import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './views/home.jsx';
import MapBox from './views/map.jsx';
import Newspot from './views/newspot.jsx';
require('./../stylesheets/app.scss');

export default class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <nav>
            <div>
              <Link to="/"><h1 className="logo">SpotSharer</h1></Link>
            </div>
            <ul>
              <li><Link to="#">Log In</Link></li>
              <li><Link to="#">Sign Up</Link></li>
              <li><Link to="/search">Search</Link></li>
              <li><Link to="/newspot">Share A Spot</Link></li>
            </ul> 
          </nav>   
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={MapBox} />
          <Route exact path="/newspot" component={Newspot} />
        </main>
      </Router>
    );
  }
}