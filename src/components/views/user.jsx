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
        <section className="sidebar">
          <img src="https://i.kinja-img.com/gawker-media/image/upload/gd8ljenaeahpn0wslmlz.jpg" className="image--cover" />
          <h3> Welcome User </h3>
          <h4>Email : </h4>
          <h4>User@example.com</h4>
          <h4>Phone Number</h4><i className="fa fa-phone" aria-hidden="true"></i>
          <h4>1-(800)-000-1234</h4>
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