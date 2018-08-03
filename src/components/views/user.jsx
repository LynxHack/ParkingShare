require('./../../stylesheets/user.scss');
import React, { Component } from "react";

export default class userPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
<div className="userSection">
<section className="reservations">
<h3> Your Reservations </h3>
<div id="container">            

       <article class="new-tweet-article">
      <header>
        <h3>Reservation 1 </h3>
        <h5> Start Time - End Time </h5>
     </header>
      <div class="tweet-body">
      <p class ="message">     
       <p class ="">Address : </p>
      <p class ="">City : </p>
      <p class ="">Postal Code : </p>
      <p class ="">Stall #  : </p>
      <p class ="">Buzzer #  : </p></p>
      </div>
    </article>

       <article class="new-tweet-article">
      <header>
        <h3>Reservation 2 </h3>
        <h5> Start Time - End Time </h5>
     </header>
      <div class="tweet-body">
      <p class ="message">     
       <p class ="">Address : </p>
      <p class ="">City : </p>
      <p class ="">Postal Code : </p>
      <p class ="">Stall #  : </p>
      <p class ="">Buzzer #  : </p></p>
      </div>
    </article>

        <article class="new-tweet-article">
      <header>
        <h3>Reservation 3 </h3>
        <h5> Start Time - End Time </h5>
     </header>
      <div class="tweet-body">
      <p class ="message">     
       <p class ="">Address : </p>
      <p class ="">City : </p>
      <p class ="">Postal Code : </p>
      <p class ="">Stall #  : </p>
      <p class ="">Buzzer #  : </p></p>
      </div>
    </article>

</div> 



</section>



</div>

    );
  }
}