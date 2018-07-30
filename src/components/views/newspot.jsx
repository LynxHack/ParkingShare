require('./../../stylesheets/newspot.scss');

import React, { Component } from "react";

export default class Newspot extends Component {
  constructor(props){
    super(props);
    this.state = {
      picture: '',
      stall: 0,
      buzzer: 0,

      name: '',
      description: '',

      address: '',
      city: '',
      postalcode: '',
      maxheight: ''
    }
  }

  render() {
    return (
      <div className = "newspot">
        <h1 className="heading">Create a new parking space</h1>
        <form>
          <input type="text" id="address-bar" placeholder="Address ex. 1234 Sasamat Drive"/>
          <input type="text" id="city-bar" placeholder="City"/>
          <input type="text" id="postalcode-bar" placeholder="Postal-Code ex. A2G 2U9"/>
        </form>
      </div>
    );
  }
}