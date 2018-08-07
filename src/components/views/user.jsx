require('./../../stylesheets/user.scss');
import React, { Component } from "react";
import axios from 'axios';
import { resCard } from './_resCard.jsx';
import { parkingCard } from './_parkingspot.jsx';

export default class userPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      parkingspots: [],
      reservations: [],  //to populate with userregistration objects
      reservationsloading: true,
      userspotsloading: true
    }
  }
  componentDidMount() {
    this.setState({
      reservationsloading: true,
      userspotsloading: true
    })
    axios.post('/getreservations', {})
      .then((res) => {
        this.setState({
          reservations: res.data,
          reservationsloading: false
        })
      })
      .catch((err) => {
        console.log(err);
      })
    axios.get(`/db/spots/user`)
      .then((result) => {
        this.setState({
          parkingspots: result.data,
          userspotsloading: false
        })
      })
      .catch((err) => {
        console.log(`Error retrieving user parking spots ${err}`);
      })
  }

  render() {
    const { reservations, parkingspots } = this.state;
    return (
      <div className="userSection">
        <section className="usersidebar">
          <img src={this.props.userpicture} className="image--cover" />
          <h3> {this.props.userfirstname} {this.props.userlastname}</h3>
          <h4>{this.props.useremail} </h4>
          <h4>{this.props.userphonenumber}</h4>
        </section>
        <section className="reservations">
          <h3> Your Reservations </h3>
          <div id="container">
            {!this.state.reservationsloading && reservations.map((e) => {
              return resCard(e);
            })}
          </div>
        </section>
        <section className="spots">
          <h3> Your Parking Spots </h3>
          <div id="container">
            {!this.state.userspotsloading && parkingspots.map((e) => {
              return parkingCard(e);
            })}
          </div>
        </section>
      </div>
    );
  }
}