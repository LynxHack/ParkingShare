require('./../../stylesheets/user.scss');
import React, { Component } from "react";

export default class userPage extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
          <div className="userProfile">
          <h1>Welcome User</h1>
            <div className="userProfilePicture">
                <img src="https://i.stack.imgur.com/WmvM0.png" />
            </div>
            <div className="userProfileInfo">
                <h4>Name :</h4>
                <h3> John Doe </h3>
                <h4>Email :</h4>
                <h3> john.doe@example.com </h3>
            </div>
            <div className="userProfileVehicles">
                <h5>Make : BMW </h5>
                <h5>Model : X6  </h5>
                <h5>License Plate # : 999-999  </h5>
                <h5>Color : Black</h5>
            </div>
            <div className="userProfileReservations">
                <h5>StartTime : 1 PM </h5>
                <h5>EndTIme : 4 PM  </h5>
                <h5>Location : GPS </h5>
                <h5>Stall : 1 </h5>
                <h5>Buzzer : XXXX  </h5>
            </div>
            <div className="userProfileSpots">
                <h5>Address : 1092 Rockcliffe RD  </h5>
                <h5>City : Vancouver </h5>
                <h5>Postal Code : V0H1T0  </h5>
                <h5>Stall : 1 </h5>
                <h5>Buzzer : XXXX  </h5>
            </div>
          </div>
      </div>
    );
  }
}