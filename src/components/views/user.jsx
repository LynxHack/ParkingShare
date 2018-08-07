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
      openModal: false, //to populate with userregistration objects
      parkingspots: [],
      reservations: [],  //to populate with userregistration objects
      reservationsloading: true,
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
  }

  openModal() {
    this.setState(prevState => ({
      openModal: !prevState.openModal
      
    }));
    console.log("HEYYYYYYYYYY")
  }

  render() {
    const { reservations, parkingspots } = this.state;
    if(this.state.openModal === false) {
      return (

      <div className="userSection">
        <section className="sidebar">
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

<section className="cars">
<h3> Your Vehicles </h3>
<input class="button" type="button" value="Add A Vehicle" onClick={this.openModal}/>
<div id="container">            

       <article class="new-tweet-article">
      <header>
        <h3>Vehicle ID: </h3>

     </header>
      <div class="tweet-body">
      <p class ="message">     
       <p class ="">Make : </p>
      <p class ="">Model : </p>
      <p class ="">Color : </p>
      <p class ="">License Plate : </p>
      </p>
      </div>
    </article>

       <article class="new-tweet-article">
      <header>
        <h3>Vehicle ID: </h3>

     </header>
      <div class="tweet-body">
      <p class ="message">     
       <p class ="">Make : </p>
      <p class ="">Model : </p>
      <p class ="">Color : </p>
      <p class ="">License Plate : </p>
      </p>
      </div>
    </article>

      </div> 
      </section>









      </div>
 );} else {
  return (
<form >        
<div id="carform">
          <h1 className="fs-title">Add A Vehicle</h1>
          <input type="text" name="make" placeholder="Make" />
          <input type="text" name="model" placeholder="Model"/>
          <input type="text" name="color" placeholder="Color"/>
         
          <input type="text" name="plateNumber" placeholder="License Plate #"/>
          <input type="button" name="next" className="action-button" value="Next" onClick={this.openModal}/>
        </div>
      </form>
  );
    }
  }
}