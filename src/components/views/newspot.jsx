require('./../../stylesheets/newspot.scss');
import axios from 'axios';
import React, { Component } from "react";
import api from './../helpers/api.js'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class Newspot extends Component {
  constructor(props){
    super(props);
    this.reader = new FileReader();
    this.state = {
      picture: '',
      stall: 0,
      buzzer: 0,
      image: null, //not the url for database
      name: '',
      description: '',

      address: '',
      city: '',
      postalcode: '',
      maxheight: ''
    }

    this.onImageChange = this.onImageChange.bind(this)
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
    api.getMapData(this.state.address + " " + this.state.city)
    .then((data) => {
        let postdata = Object.assign({}, this.state);
        postdata["longitude"] = data.results[0];
        postdata["latitude"] = data.results[1];

        console.log(postdata);
        axios.post('/newspot', postdata)
        .then(function(response){
          console.log(response);
        })
        .catch(function(err){
          console.log(err);
        })
      }    
    )
    .catch((err) => console.log(err))
    console.log(this.state);
  }

  editform(e){
    const fieldname = e.target.getAttribute("name");
    const value = e.target.value;
    console.log("Field is ", fieldname, "value is ", value)
    this.setState({[fieldname]: value })
  }

  render() {
    console.log(this.state);
    if(!this.props.isLoggedIn){
      console.log("user not logged in!")
      return <Redirect to="/" />
    }
    return (
      <form id="sharespotform">
      <div className="file-upload">
      <h3>Dont forget to upload a picture of your spot</h3>
    <label for="upload" className="file-upload__label">Upload A Picture Of Your Spot</label>
    <input id="upload" className="file-upload__input" type="file" name="file-upload" onClick={this.onImageChange.bind(this)}/>
    <img id="imgbox" src={this.state.image} height="200px" width="200px"/>
    </div>
        
        <div id="msform">
          <h1 className="fs-title">Create your Spot</h1>
          <input type="text" name="address" placeholder="Address" onChange={this.editform.bind(this)}/>
          <input type="text" name="city" placeholder="City" onChange={this.editform.bind(this)} />
          <input type="text" name="postalcode" placeholder="Postal Code" onChange={this.editform.bind(this)}/>
          <textarea type="text" name="description" placeholder="Description" onChange={this.editform.bind(this)}/>
          <input type="text" name="buzzer" placeholder="Buzzer info (optional)" onChange={this.editform.bind(this)}/>
          <input type="text" name="maxheight" placeholder="Maxheight (optional)" onChange={this.editform.bind(this)}/>
          <input type="text" name="stall" placeholder="Stall" onChange={this.editform.bind(this)}/>
          <input type="button" name="next" className="action-button" value="Next" onClick={this.submitform.bind(this)}/>
        </div>
      </form>
    );
  }
}