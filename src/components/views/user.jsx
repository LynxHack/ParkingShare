require('./../../stylesheets/user.scss');
import React, { Component } from "react";
import axios from 'axios';
import { resCard } from './_resCard.jsx';
import { parkingCard } from './_parkingspot.jsx';
import { vehicle } from './_vehicles.jsx';

export default class userPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      reservationsincoming: [],
      openModal: false, //to populate with userregistration objects
      parkingspots: [],
      reservationsloading: true,
      userspotsloading: true,
      vehiclesloading: true,
      vehicles: [],
      make : '',
      model : '',
      color : '',
      licenseplate : '',

      reservationsincomingloading: true,
      userspotsloading: true
    }
    self = this;
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
      axios.post('/getVehicles', {})
      .then((res) => {
        console.log("hi", res.data)
        this.setState({
          vehicles: res.data,
          vehiclesloading: false
        })
      })
      .catch((err) => {
        console.log(err);
      })
  }


  editMake(e){
    this.setState({make : e.target.value})
  }
  editModel(e){
    this.setState({model : e.target.value})
  }
  editColor(e){
    this.setState({color : e.target.value})
  }
  editLicensePlate(e){
    this.setState({licenseplate : e.target.value})
  }
  submitform = () => {
    axios.post('/addvehicle',{make: self.state.make, model : self.state.model, color : self.state.color, licenseplate : self.state.licenseplate})
    .then((res) => {
      this.setState({openModal : false}, () =>{
        this.componentDidMount()
      })
      console.log("result is", res)
    })
    .catch((err) => {
      console.log(err);
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
    console.log(this.state.openModal,'STATEETETE')
    const { reservations, parkingspots, vehicles, reservationsincoming } = this.state;
    if(this.state.openModal === false) {

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
<input class="button" type="button" value="Add A Vehicle" onClick={this.openModal}/>
<div id="container">            
    {!this.state.vehiclesloading && vehicles.map((e) => {
              return vehicle(e);
            })}     
      </div> 
      </section>
</span>
</div>
      </div>
 );} else {
  return (
<form >        
          <div id="carform">
          <h1 className="fs-title">Add A Vehicle</h1>
          <input type="text" name="make" placeholder="Make" onChange={this.editMake.bind(this)} />
          <input type="text" name="model" placeholder="Model" onChange={this.editModel.bind(this)}/>
          <input type="text" name="color" placeholder="Color" onChange={this.editColor.bind(this)}/>
         
          <input type="text" name="plateNumber" placeholder="License Plate #" onChange={this.editLicensePlate.bind(this)}/>
          <input type="button" name="next" className="action-button" value="Next" onClick={this.submitform}/>
        </div>
      );
        </form>
      );
    }
  }
}