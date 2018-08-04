require('./../../stylesheets/user.scss');
import React, { Component } from "react";

export default class userPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
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





</div>

    );
  }
}