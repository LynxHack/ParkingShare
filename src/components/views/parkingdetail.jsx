require('./../../stylesheets/parkingdetail.scss');
import axios from 'axios';
import React, { Component } from "react";
import api from './../helpers/api.js'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class Newspot extends Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <h1 className="placeholder">
            Parking Detail Placeholder
        </h1>
    );
  }
}