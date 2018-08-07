require('./../../stylesheets/user.scss');
import React, { Component } from "react";
import axios from 'axios';


export default class userPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      reservations: [],
      openModal: false //to populate with userregistration objects
    }
    this.openModal = this.openModal.bind(this)
  }

  componentDidMount(){
    axios.post('/getreservations', {})
    .then((res) => {
      for(let i = 0; i < res.data.length; i++){
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

  generatereservationcard(res){
    console.log(res);
    return(
      <article className="new-tweet-article">
      <header>
        <h3>Reservation {res.resnum}</h3>
        <h5> {res.starttime} - {res.endtime} </h5>
     </header>
      <div className="tweet-body">
      <p className ="message">     
       <p className ="">Address : {res.address} </p>
      <p className ="">City : {res.city}</p>
      <p className ="">Postal Code : {res.postalcode}</p>
      <p className ="">Stall #  : {res.stall}</p>
      <p className ="">Buzzer #  : {res.buzzer}</p></p>
      </div>
    </article>
    )
  }

  openModal() {
    this.setState(prevState => ({
      openModal: !prevState.openModal
      
    }));
    console.log("HEYYYYYYYYYY")
  }

  render() {
    if(this.state.openModal === false) {
    return (

      
<div className="userSection">
<section className="sidebar">
  <img src="https://i.kinja-img.com/gawker-media/image/upload/gd8ljenaeahpn0wslmlz.jpg" class="image--cover"/>
  <h3> Welcome User </h3>
  <h4>Email : </h4>
  <h4>User@example.com</h4>
  <h4>Phone Number</h4><i class="fa fa-phone" aria-hidden="true"></i>


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

       <article class="new-tweet-article">
      <header>
        <h3>Spot ID: </h3>

     </header>
      <div class="tweet-body">
      <p class ="message">     
       <p class ="">Address : </p>
      <p class ="">City : </p>
      <p class ="">Postal Code : </p>
      </p>
      </div>
    </article>

       <article class="new-tweet-article">
      <header>
        <h3>Spot ID: </h3>

     </header>
      <div class="tweet-body">
      <p class ="message">     
       <p class ="">Address : </p>
      <p class ="">City : </p>
      <p class ="">Postal Code : </p>
      </p>
      </div>
    </article>

       <article class="new-tweet-article">
      <header>
        <h3>Spot ID: </h3>

     </header>
      <div class="tweet-body">
      <p class ="message">     
       <p class ="">Address : </p>
      <p class ="">City : </p>
      <p class ="">Postal Code : </p>
      </p>
      </div>
    </article>

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