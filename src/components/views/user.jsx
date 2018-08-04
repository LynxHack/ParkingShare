require('./../../stylesheets/user.scss');
import React, { Component } from "react";
import axios from 'axios';


export default class userPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [] //to populate with userregistration objects
    }
  }
  componentDidMount() {
    axios.post('/getreservations', {})
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          this.setState((prevState) => {
            reservations: prevState.reservations.push({
              resnum: i,
              address: res.data[i].address,
              city: res.data[i].city,
              postalcode: res.data[i].postalcode,
              stall: res.data[i].stall,
              buzzer: res.data[i].buzzer,
              starttime: res.data[i].startimeunix,
              endtime: res.data[i].endtimeunix
            })
          })
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  generatereservationcard(res) {
    console.log(res);
    return (
      <article className="new-tweet-article">
        <header>
          <h3>Reservation {res.resnum}</h3>
          <h5> {res.starttime} - {res.endtime} </h5>
        </header>
        <div className="tweet-body">
          <p className="message"></p>
          <p className="">Address : {res.address} </p>
          <p className="">City : {res.city}</p>
          <p className="">Postal Code : {res.postalcode}</p>
          <p className="">Stall #  : {res.stall}</p>
          <p className="">Buzzer #  : {res.buzzer}</p>
        </div>
      </article>
    )
  }

  render() {
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
            {this.generatereservationcard(this.state.reservations)}
          </div>
        </section>
        <section className="spots">
          <h3> Your Parking Spots </h3>
          <div id="container">
            <article className="new-tweet-article">
              <header>
                <h3>Spot ID: </h3>
              </header>
              <div className="tweet-body">
                <p className="message"></p>
                <p className="">Address : </p>
                <p className="">City : </p>
                <p className="">Postal Code : </p>
              </div>
            </article>
            <article className="new-tweet-article">
              <header>
                <h3>Spot ID: </h3>
              </header>
              <div className="tweet-body">
                <p className="message"></p>
                <p className="">Address : </p>
                <p className="">City : </p>
                <p className="">Postal Code : </p>
              </div>
            </article>
            <article className="new-tweet-article">
              <header>
                <h3>Spot ID: </h3>
              </header>
              <div className="tweet-body">
                <p className="message"></p>
                <p className="">Address : </p>
                <p className="">City : </p>
                <p className="">Postal Code : </p>
              </div>
            </article>
          </div>
        </section>
      </div>
    );
  }
}