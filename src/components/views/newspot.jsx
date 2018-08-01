require('./../../stylesheets/newspot.scss');
import axios from 'axios';



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

  submitform(e){
    e.preventDefault();
    console.log(this.state);
    axios.post('/newspot', this.state)
    .then(function(response){
      console.log(response);
    })
    .catch(function(err){
      console.log(err);
    })
  }

  editform(e){
    const fieldname = e.target.getAttribute("name");
    const value = e.target.value;
    console.log("Field is ", fieldname, "value is ", value)
    this.setState({[fieldname]: value })
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
          <input type="text" name="address" placeholder="Address" onChange={this.editform.bind(this)}/>
          <input type="text" name="city" placeholder="City" onChange={this.editform.bind(this)} />
          <input type="text" name="postalcode" placeholder="Postal Code" onChange={this.editform.bind(this)}/>
          <textarea type="text" name="description" placeholder="Description" onChange={this.editform.bind(this)}/>
          <input type="text" name="buzzer" placeholder="Buzzer info (optional)" onChange={this.editform.bind(this)}/>
          <input type="text" name="maxheight" placeholder="Maxheight (optional)" onChange={this.editform.bind(this)}/>
          <input type="text" name="stall" placeholder="Stall" onChange={this.editform.bind(this)}/>
          <input type="button" name="next" class="action-button" value="Next" onClick={this.submitform.bind(this)}/>
        </div>
      </form>
    );
  }
}