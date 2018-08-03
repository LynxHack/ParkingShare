require('./../../stylesheets/review.scss');
import axios from 'axios';
import React, { Component } from "react";
import api from './../helpers/api.js'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class MyReservations extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: "A little rough but nice!",
        rating: 4,
        comment: "I booked this parking spot due to the convenient location. However, entering and exiting the space requires some skill.",
        picture: "http://localhost.com/jblocal/secure-html/onlineec/images/stars/4StarBlue09.gif",
        author: "Lucky67",
        datecreated: "August 27, 2013"
    }
  }

  render() {
    return (
        <div class="review">
        <span class="title">{this.state.title} {this.state.rating}/5
            <br/><img class="stars" src={this.state.picture}/></span>

          <span class="comments">{this.state.comment}</span>
        <span class="author">By {this.state.author} on {this.state.datecreated}</span>
          
          <div class="vote">
           Was this review helpful?
           <input type="submit" value="Yes"/>
          </div>
     </div>
    );
  }
}