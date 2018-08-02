import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from './views/home.jsx';
import MapContainer from './views/mapContainer.jsx';
import Newspot from './views/newspot.jsx';
import axios from 'axios';
import Login from './views/login.jsx'
import UserPage from './views/user.jsx';
import MyReservations from './views/myreservations.jsx'

require('./../stylesheets/app.scss');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showLoginform: false,
      userfirstname: "",
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.navlogincheck = this.navlogincheck.bind(this);
    this.attemptlogin = this.attemptlogin.bind(this);
    this.attemptlogout = this.attemptlogout.bind(this);
    this.loadpagecookiecheck = this.loadpagecookiecheck.bind(this);
    this.closeLogin =this.closeLogin.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      showLoginform: !prevState.showLoginform
    }));
  }

  navlogincheck(){
    if(this.state.isLoggedIn){
      return (
        <ul>
          <li><Link to="/newspot">Share A Spot</Link></li>
          <li><Link to="/myreservations">My Reservations</Link></li>
          <li><Link to="/user">Hi {this.state.userfirstname}!</Link></li>
          <li onClick={this.attemptlogout.bind(this)}><Link to="/">Logout</Link></li>
        </ul>
      )
    }
    else{
      return (
        <ul>
          <li><Link to="#" onClick={this.handleClick} >Login / Sign-Up</Link></li>)
        </ul>
      )
    }
  }

  attemptlogin(email, password){
    const state = this; //obtain 
    axios.post('/login', {email: email, password: password})
    .then(function(response){
      if(response.status === 200){
        state.setState({isLoggedIn: true});
        console.log("Setting userfirstname to ", response.data[0].firstname);
        state.setState({userfirstname: response.data[0].firstname})
      }
      else{ //401
        state.setState({isLoggedIn: false});
      }
      console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  attemptlogout(){
    console.log("Attempt logout");
    axios.post('/logout', {})
    .then((result) => {
      console.log(result);
      if(result.status === 200){
        this.setState({isLoggedIn: false});
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  loadpagecookiecheck(){
      axios.post('/initiallog', {})
      .then((result) => {
        if(result.status === 200){
          console.log(result)
          this.setState({isLoggedIn: true})
          this.setState({userfirstname: result.data.firstname})
        }
        else{
          this.setState({isLoggedIn: false});
          this.setState({userfirstname: ""});
        }
      })
      .catch((error) => console.log(error));
    }
  
  closeLogin(){
    console.log("CLICKED")
    this.setState(prevState => ({
      showLoginform: !prevState.showLoginform
    }));
  }

  checkLogin() {
    if(this.state.showLoginform)
      return(<div>
        <Login attemptlogin={this.attemptlogin} />
        <a class="backdrop" onClick={this.closeLogin}></a>
      </div>)
  }
  

  componentDidMount(){
      this.loadpagecookiecheck();
  }

  render() {
    return (
      <Router>
        <main>
          <nav>
            <div>
              <Link to="/"><h1 className="logo">SpotSharer</h1></Link>
            </div>
            {this.navlogincheck()}
          </nav>   
          <Route exact path="/"                render ={(defprops) => <Home isLoggedIn = {this.state.isLoggedIn} {...defprops} /> } />
          <Route exact path="/newspot"         render ={(defprops) => <Newspot isLoggedIn = {this.state.isLoggedIn} {...defprops} /> } />
          <Route exact path="/user"            render ={(defprops) => <UserPage isLoggedIn = {this.state.isLoggedIn} {...defprops} /> } />
          <Route exact path="/search"          render ={(defprops) => <MapContainer isLoggedIn = {this.state.isLoggedIn} {...defprops} /> } />
          <Route exact path="/myreservations"  render ={(defprops) => <MyReservations isLoggedIn = {this.state.isLoggedIn} {...defprops} /> } />
          
          {this.checkLogin()}
        </main>
      </Router>
    );
  }
}
