import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from './views/home.jsx';
import MapContainer from './views/mapContainer.jsx';
import Newspot from './views/newspot.jsx';
import axios from 'axios';
require('./../stylesheets/app.scss');
import Login from './views/login.jsx'
import userPage from './views/user.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoggedIn: false,
                  showLoginform: false};


    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.navlogincheck = this.navlogincheck.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn,
      showLoginform: !prevState.showLoginform
    }));

  }

  navlogincheck(){
    if(this.state.isLoggedIn)
      return(
        <li><Link to="/newspot">Share A Spot</Link></li>
      )
  }

  attemptlogin(email, password){
    console.log(email, password);
    axios.post('/login', {email: email, password: password})
    .then(function(response){
      console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  checkLogin() {
    if(this.state.showLoginform)
      return(
        <Login attemptlogin={this.attemptlogin} />
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
              {this.navlogincheck()}
            </ul> 
          </nav>   
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={MapContainer} key="search" />
          <Route exact path="/newspot" component={Newspot} />
          <Route exact path="/user" component={userPage} />
          {this.checkLogin()}
        </main>
      </Router>
    );
  }
}