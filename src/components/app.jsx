import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './views/home.jsx';
import MapContainer from './views/mapContainer.jsx';
import Newspot from './views/newspot.jsx';
require('./../stylesheets/app.scss');
import Login from './views/login.jsx'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false,
                  showLoginform: false};


    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn,
      showLoginform: !prevState.showLoginform
    }));

  }
  checkLogin() {
    if(this.state.showLoginform)
    return(
      <Login />
    )
  }
  render() {
    return (
      <Router>
        <main>
          <nav>
            <div>
              <Link to="/"><h1 className="logo">SpotSharer</h1></Link>
            </div>
            <ul>
              <li><Link to="#" onClick={this.handleClick} >Login / Sign-Up</Link></li>
              <li><Link to="/newspot">Share A Spot</Link></li>
            </ul> 
          </nav>   
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={MapContainer} />
          <Route exact path="/newspot" component={Newspot} />
          {this.checkLogin()}
        </main>
      </Router>
    );
  }
}