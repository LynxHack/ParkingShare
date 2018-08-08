import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Home from './views/home.jsx';
import MapContainer from './views/mapContainer.jsx';
import Newspot from './views/newspot.jsx';
import axios from 'axios';
import Login from './views/login.jsx'
import UserPage from './views/user.jsx';
import MyReservations from './views/myreservations.jsx'
import ParkingDetail from './views/parkingdetail.jsx'

require('./../stylesheets/app.scss');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      showLoginform: false,
      userid: "",
      userfirstname: "",
      userlastname: "",
      useremail: "",
      userphonenumber: "",
      userpicture: "",
      failedLoginAttempt: false
    };

    // This binding is necessary to make `this` work in the callback
    this.handleClick = this.handleClick.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.navlogincheck = this.navlogincheck.bind(this);
    this.attemptlogin = this.attemptlogin.bind(this);
    this.attemptlogout = this.attemptlogout.bind(this);
    this.loadpagecookiecheck = this.loadpagecookiecheck.bind(this);
    this.closeLogin = this.closeLogin.bind(this)
  }

  handleClick() {
    this.setState(prevState => ({
      showLoginform: !prevState.showLoginform
    }));
  }

  navlogincheck() {
    if (this.state.isLoggedIn) {
      return (
        <ul>
          <li><Link to="/user">Hi {this.state.userfirstname}!</Link></li>
          <li><Link to="/newspot">Share A Spot</Link></li>
          {/* <li><Link to="/parkingdetail">(Dev) Parking Detail</Link></li> */}
          <li onClick={this.attemptlogout.bind(this)}><Link to="/">Logout</Link></li>
        </ul>
      )
    }
    else {
      return (
        <ul>
          <li><Link to="#" onClick={this.handleClick} >Login / Sign-Up</Link></li>)
        </ul>
      )
    }
  }

  attemptlogin = (email, password) => {
    axios.post('/login', { email: email, password: password })
      .then((response) => {
        if (response.status === 200) {
          this.setState((prevState) => ({
            isLoggedIn: true,
            userid: response.data[0].id,
            userfirstname: response.data[0].firstname,
            userlastname: response.data[0].lastname,
            useremail: response.data[0].email,
            userphonenumber: response.data[0].telephone,
            userpicture: response.data[0].picture,
            showLoginform: false,
            failedLoginAttempt: true
          }));
        }
      })
      .catch((err) => {
        console.log(`ERROR CAUGHT${err}`);
      })
  }

  attemptlogout() {
    console.log("Attempt logout");
    axios.post('/logout', {})
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          this.setState({ isLoggedIn: false });
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  loadpagecookiecheck() {
    axios.post('/initiallog', {})
      .then((result) => {
        console.log(result.data);
        
        if (result.status === 200) {
          this.setState({
            isLoggedIn: true,
            userid: result.data.id,
            userfirstname: result.data.firstname,
            userlastname: result.data.lastname,
            useremail: result.data.email,
            userphonenumber: result.data.telephone,
            userpicture: result.data.picture,
          })
        }
        else {
          this.setState({ isLoggedIn: false });
          this.setState({ userfirstname: "" });
        }
      })
      .catch((error) => console.log(error));
  }

  closeLogin() {
    this.setState(prevState => ({
      showLoginform: false
    }));
  }

  checkLogin() {
    if (this.state.showLoginform)
      return (
        <div>
          <Login attemptlogin={this.attemptlogin} failedLoginAttempt={this.state.failedLoginAttempt} />
          <a className="backdrop" onClick={this.closeLogin}></a>
        </div>)
  }

  refreshpage(){
    window.location.reload()
  }

  componentDidMount() {
    this.loadpagecookiecheck();
  }

  render() {
    return (
      <Router>
        <main>

          <nav>
            <div>
            {/* <Link to="/"><h1 className="logo">Spotshare</h1> /></Link> */}
              <Link to="/" onClick={this.refreshpage} style={{ textDecoration: 'none' }}><h1 className="logo">SpotSharer</h1></Link>
            </div>
            {this.navlogincheck()}
          </nav>

          <Route exact path="/search" component={MapContainer} key="search" />

          <Route exact path="/" render={(defprops) => <Home isLoggedIn={this.state.isLoggedIn} {...defprops} />} />
          <Route exact path="/newspot" render={(defprops) => <Newspot 
            isLoggedIn={this.state.isLoggedIn}
            userid={this.state.userid}
            userfirstname={this.state.userfirstname}
            userlastname={this.state.userlastname}
            useremail={this.state.useremail}
            userphonenumber={this.state.userphonenumber}
            userpicture={this.state.userpicture} />} />
          <Route exact path="/user" render={(defprops) => <UserPage 
            isLoggedIn={this.state.isLoggedIn} 
            userid={this.state.userid}
            userfirstname={this.state.userfirstname}
            userlastname={this.state.userlastname}
            useremail={this.state.useremail}
            userphonenumber={this.state.userphonenumber}
            userpicture={this.state.userpicture} />} />
          {/* <Route exact path="/myreservations" render={(defprops) => <MyReservations isLoggedIn={this.state.isLoggedIn} {...defprops} />} /> */}
          <Route exact path="/parkingdetail" render={(defprops) => <ParkingDetail isLoggedIn={this.state.isLoggedIn} {...defprops} />} />
          {this.checkLogin()}
        </main>
      </Router>
    );
  }
}
