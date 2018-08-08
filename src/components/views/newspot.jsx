require('./../../stylesheets/newspot.scss');
import axios from 'axios';
import React, { Component } from "react";
import api from './../helpers/api.js'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { ImageSource } from 'mapbox-gl';


export default class Newspot extends Component {
  constructor(props) {
    super(props);
    this.reader = new FileReader();
    this.state = {
      newspotposted: false,
      userid: this.props.userid,
      picture: '',
      stall: 0,
      buzzer: 0,
      image: null, //not the url for database
      name: '',
      description: '',
      address: '',
      city: '',
      postalcode: '',
      maxheight: '',
      imageURL: '',
      uploadStatus: false

    }

    // this.onImageChange = this.onImageChange.bind(this);
    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  // onImageChange(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     let reader = new FileReader();
  //     reader.onload = (e) => {
  //       this.setState({ image: e.target.result });
  //     };
  //     reader.readAsDataURL(event.target.files[0]);
  //   }
  // }

  submitform(e) {
    e.preventDefault();
    api.getMapData(this.state.address + " " + this.state.city)
      .then((data) => {
        let postdata = Object.assign({}, this.state);
        postdata["longitude"] = data.results[0];
        postdata["latitude"] = data.results[1];
        axios.post('/newspot', postdata)
          .then((result) => {
            if (result.status == 200) {
              this.setState({
                newspotposted: true
              })
            }
          })
          .catch(function (err) {
            console.log(`Error posting new parking spot: ${err}`);
          })
      })
      .catch((err) => console.log(err))
  }

  editform(e) {
    const fieldname = e.target.getAttribute("name");
    const value = e.target.value;
    // console.log("Field is ", fieldname, "value is ", value)
    this.setState({ [fieldname]: value })
  }

  async handleUploadImage(ev) {
    ev.preventDefault();

    const data = new FormData();
    await data.append('file', this.uploadInput.files[0]);
    await data.append('filename', this.fileName.value);

    axios.post('http://localhost:8080/upload/userspot', data)
      .then((response) => {
        this.setState({ imageURL: `http://localhost:8080/${response.data.file}`, uploadStatus: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (!this.props.isLoggedIn) {
      console.log("user not logged in!")
    }
    { if (this.state.newspotposted) return <Redirect to="/user" /> }

    return (
      <div>
        <div id="pictureupload" className="file-upload">
          <h2>Upload a picture</h2>
          <form onSubmit={this.handleUploadImage}>
            <div className="form-group">
              <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
            </div>

            <div className="form-group">
              <input className="form-control" ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Optional name for the file" />
              <div>
                <button className="action-button" >Upload</button>
              </div>
              {this.state.uploadStatus && <img src="https://cdn2.iconfinder.com/data/icons/weby-flat-vol-1/512/1_Approved-check-checkbox-confirm-green-success-tick-512.png" />}
            </div>
          </form>
        </div>
        {/* <div className="file-upload">
          <h3>Dont forget to upload a picture of your spot</h3>
          <label className="file-upload__label">Upload A Picture Of Your Spot</label>
          <input id="upload" className="file-upload__input" type="file" name="file-upload" onClick={this.onImageChange.bind(this)} />
          <img id="imgbox" src={this.state.image} height="200px" width="200px" />
        </div> */}

        <form id="sharespotform">
          <div id="msform">
            <h1 className="fs-title">Create your Spot</h1>
            <input type="text" name="address" placeholder="Address" onChange={this.editform.bind(this)} />
            <input type="text" name="city" placeholder="City" onChange={this.editform.bind(this)} />
            <input type="text" name="postalcode" placeholder="Postal Code" onChange={this.editform.bind(this)} />
            <textarea type="text" name="description" placeholder="Description" onChange={this.editform.bind(this)} />
            <input type="text" name="buzzer" placeholder="Buzzer info (optional)" onChange={this.editform.bind(this)} />
            <input type="text" name="maxheight" placeholder="Maxheight (optional)" onChange={this.editform.bind(this)} />
            <input type="text" name="stall" placeholder="Stall" onChange={this.editform.bind(this)} />
            <input type="button" name="next" className="action-button" value="Next" onClick={this.submitform.bind(this)} />
          </div>
        </form >
      </div>
    );
  }
}