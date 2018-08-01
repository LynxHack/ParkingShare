require('./../../stylesheets/newspot.scss');

import React, { Component } from "react";

export default class Newspot extends Component {
  constructor(props){
    super(props);
    this.reader = new FileReader();
    this.state = {
      picture: '',
      stall: 0,
      buzzer: 0,

      name: '',
      description: '',

      address: '',
      city: '',
      postalcode: '',
      maxheight: '',
      image: null
    }
  }

  onImageChange(event) {
    if (event.target.files && event.target.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({image: e.target.result});
        };
        reader.readAsDataURL(event.target.files[0]);
    }
  }

  render() {
    return (
      <form id="sharespotform">
        <div id="formimagebox">
          <label className ="action-button" onChange={this.onImageChange.bind(this)}>
            <input type="file"/>
            Parking Image
          </label>
          <img id="imgbox" src={this.state.image}/>
        </div>
        <div id="msform">
          <h1 class="fs-title">Create your Spot</h1>
          <input type="text" name="address" placeholder="Address" />
          <input type="text" name="city" placeholder="City" />
          <input type="text" name="postalcode" placeholder="Postal Code" />
          <textarea type="text" name="description" placeholder="Description" />
          <input type="text" name="buzzer" placeholder="Buzzer info (optional)" />
          <input type="text" name="buzzer" placeholder="Maxheight (optional)" />

          <input type="button" name="next" class="action-button" value="Next" />
        </div>
      </form>
    );
  }
}