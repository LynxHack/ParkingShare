import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './views/home.jsx';
import Contact from './views/contact.jsx';
require('./../stylesheets/app.scss');

export default class App extends Component {
  render() {
    return (
      <Router>
        <main>
          <nav>
            <div>
              <Link to="/"><h1>SpotSharer</h1></Link>
            </div>
            <ul>
              <li><Link to="#">Log In</Link></li>
              <li><Link to="#">Sign Up</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="#">Share A Spot</Link></li>
            </ul> 
          </nav>   
          <Route exact path="/" component={Home} />
          <Route exact path="/contact" component={Contact} />
        </main>
      </Router>
    );
  }
}