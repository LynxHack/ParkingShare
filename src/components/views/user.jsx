require('./../../stylesheets/user.scss');
import React, { Component } from "react";
import axios from 'axios';
import { resCard } from './_resCard.jsx';

export default class userPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],  //to populate with userregistration objects
      loading: true
    }
  }
  componentDidMount() {
    this.setState({
      loading: true
    })
    axios.post('/getreservations', {})
      .then((res) => {
        this.setState({
          reservations: res.data
        })
      })
      .then(() => {
        this.setState({
          loading: false
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    const { reservations } = this.state;
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
            {!this.state.loading && reservations.map((e) => {
              return resCard(e);
            })}
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