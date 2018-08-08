require('./../../stylesheets/user.scss');
import React, { Component } from "react";
import axios from 'axios';
import { resCard } from './_resCard.jsx';
import { parkingCard } from './_parkingspot.jsx';

export default class userPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      reservationsincoming: [],
      openModal: false, //to populate with userregistration objects
      parkingspots: [],
      reservationsloading: true,
      reservationsincomingloading: true,
      userspotsloading: true
    }
    this.openModal = this.openModal.bind(this)
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

    axios.post('/reservations/incoming')
      .then((res) => {
        this.setState({
          reservationsincoming: res.data,
          reservationsincomingloading: false
        })
      })
      .catch((err) => {
        console.log(`Error getting incoming reservations ${err}`);

      })
  }


  openModal() {
    this.setState(prevState => ({
      openModal: !prevState.openModal
    }));
  }

  render() {
    const { reservations, parkingspots, reservationsincoming } = this.state;
    if (this.state.openModal === false) {
      return (

        <div className="userSection">
          <section className="sidebar">
            <img src={this.props.userpicture} className="image--cover" />
            <h3> {this.props.userfirstname} {this.props.userlastname}</h3>
            <h5>{this.props.useremail} </h5>
            <h6> Welcome to your page! Here you can browse your reservations, spots and vehicles. Happy Sharing.</h6>
          </section>
          <span>
            <section className="reservations">
              <h3> Your Reservations Made </h3>
              <div id="container">
                {!this.state.reservationsloading && reservations.map((e) => { return resCard(e); })}
              </div>
            </section>
            <section className="reservationsIncoming">
              <h3> Incoming Reservations </h3>
              <div id="container">
                {!this.state.reservationsincomingloading && reservationsincoming.map((e) => { return resCard(e); })}
              </div>
            </section>
          </span>
          <div>
            <span>
              <section className="spots">
                <h3> Your Parking Spots </h3>
                <div id="container">
                  {!this.state.userspotsloading && parkingspots.map((e) => {
                    return parkingCard(e);
                  })}
                </div>
              </section>
            </span>

            <span>
              <section className="cars">
                <h3> Your Vehicles </h3>
                <input className="button" type="button" value="Add A Vehicle" onClick={this.openModal} />
                <div id="container">

                  <article className="new-tweet-article">
                    <header>
                      <h3>Vehicle ID: </h3>

                    </header>
                    <div className="tweet-body">
                      <div className="message">
                        <p className="">Make : </p>
                        <p className="">Model : </p>
                        <p className="">Color : </p>
                        <p className="">License Plate : </p>
                      </div>
                    </div>
                  </article>
                </div>
              </section>
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <form >
          <div id="carform">
            <h1 className="fs-title">Add A Vehicle</h1>
            <input type="text" name="make" placeholder="Make" />
            <input type="text" name="model" placeholder="Model" />
            <input type="text" name="color" placeholder="Color" />

            <input type="text" name="plateNumber" placeholder="License Plate #" />
            <input type="button" name="next" className="action-button" value="Next" onClick={this.openModal} />
          </div>
        </form>
      );
    }
  }
}