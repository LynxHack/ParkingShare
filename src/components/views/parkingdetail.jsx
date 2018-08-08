require('./../../stylesheets/parkingdetail.scss');
import axios from 'axios';
import React, { Component } from "react";
import api from './../helpers/api.js'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class ParkingDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Currently these are placeholders, to be changed state for population db
      parkingid: 1,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam elementum est, at vestibulum augue consequat at. Donec euismod convallis felis. Nam sed molestie dolor. Proin in tortor sed augue consequat viverra.",
      description2: "Private area near the city center. Have easy access to nearby stores and fesitivities. Welcome!",
      address: "3800 Capistrano Dr.",
      city: "Kelowna",
      province: "B.C.",
      postalcode: "V6W 7U5",
      price: "5.00", //hourly
      picture: "http://www.jimmybeanswool.com/secure-html/onlineec/images/stars/4_5StarBlue09.gif",

      hostname: "John Smith",
      stall: "5",
      buzzer: "5010",
      maxheight: "250", //in cm for now
      cartypes: ["motorbike", "sedan/small pickup", "full pickup/SUV"],
      curruserrating: 0,
      curruserreview: "",
      reviews: [],


      returntouserpage: false,
      totalstars: 0
    }
    self = this;
    this.reserve = this.reserve.bind(this);
    this.getUrlParameter = this.getUrlParameter.bind(this);
  }

  componentDidMount() {
    // var query = this.props.location;
    // console.log(query);
    
    // var params = { query }
    let id = this.getUrlParameter('id')
    
    // console.log(id);
    
    
    
    // var parkingid = params.query.search.slice(1).split('%')[0].split('=')[1];
    // console.log("The id of parking lot is", parkingid);
    axios.post('/parkingid', { parkingid: id })
      .then((result) => {
        console.log(result);
        this.setState({
          parkingid: result.data[0].id,
          description: result.data[0].description,
          address: result.data[0].address,
          city: result.data[0].city,
          postalcode: result.data[0].postalcode,
          picture: result.data[0].picture,
          stall: result.data[0].stall,
          buzzer: result.data[0].buzzer,
          maxheight: result.data[0].maxheight
        }), self.returnreviews(parkingid)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

  returnreviews(parkingid) {
    axios.post('/getreviews', { parkingid: parkingid })
      .then((result) => {
        for (var i = 0; i < result.data.length; i++) {
          this.setState(prevState => ({
            reviews: [...prevState.reviews, result.data[i]]
          }))
        }
      })
  }

  generatereviews(review) {
    return (
      // <Review rating={review.rating} comment={review.description} author={`${review.firstname} ${review.lastname}`} datecreated={review.created_at}/>
      <div className="review">
        <span className="title">Given Rating - {review.rating}/5 </span>
        <br />
        <br />
        <span className="comments">{review.description}</span>
        <br />
        <span className="author">By {review.firstname} {review.lastname} on {review.created_at.split('T')[0]}</span>
        <div className="vote">
          Was this review helpful?
         <input type="submit" value="Yes" />
        </div>
      </div>
    )
  }

  reserve = () => {
    let starttime = this.getUrlParameter('starttime').slice(0, 10)
    let endtime = this.getUrlParameter('endtime').slice(0, 10)
    axios.post('/reserve', { parkingid: self.state.parkingid, starttime: starttime, endtime: endtime })
      .then((result) => {
        console.log(result);
        this.setState({
          returntouserpage: true
        })
        console.log(self.state);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  updatereview(e) {
    console.log(e.target.value);
    this.setState({ curruserreview: e.target.value });
  }

  updaterating(e) {
    console.log(e.target.value)
    this.setState({ curruserrating: e.target.value });
  }

  submitreview(e) {
    axios.post('/addreview', { rating: this.state.curruserrating, parkingid: this.state.parkingid, description: this.state.curruserreview })
      .then((result) => {
        console.log(result);
        this.setState({
          reviews: []
        }, this.returnreviews(this.state.parkingid))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  checklogin() {
    console.log(this.props);
    if (this.props.isLoggedIn) {
      return (
        <div className="reviewsection">
          <textarea name="review" onChange={this.updatereview.bind(this)} placeholder="Write a review" />
          <div className="productbutton submit blueSubmit left" onClick={this.submitreview.bind(this)}>Submit Review</div>

          <fieldset className="rating" onClick={this.updaterating.bind(this)}>
            <input type="radio" id="star5" name="rating" value="5" /><label className="full" for="star5" title="Awesome - 5 stars"></label>
            <input type="radio" id="star4" name="rating" value="4" /><label className="full" for="star4" title="Pretty good - 4 stars"></label>
            <input type="radio" id="star3" name="rating" value="3" /><label className="full" for="star3" title="Meh - 3 stars"></label>
            <input type="radio" id="star2" name="rating" value="2" /><label className="full" for="star2" title="Kinda bad - 2 stars"></label>
            <input type="radio" id="star1" name="rating" value="1" /><label className="full" for="star1" title="Sucks big time - 1 star"></label>
          </fieldset>
        </div>
      )
    }
  }

  getaveragerating() {
    console.log(self.state.reviews);
    if (self.state.reviews.length > 0) {
      //   const totalstars = self.state.reviews.reduce((a,b) => {
      //     return Number(a.rating) + Number(b.rating)
      // })
      let sum = 0;
      console.log(typeof (self.state.reviews.rating));
      for (let i = 0; i < self.state.reviews.length; i++) {
        sum += Number(self.state.reviews[i].rating);
      }
      console.log(sum, self.state.reviews.length);
      return sum / self.state.reviews.length;
    }
    else {
      return 0;
    }
  }

  renderstars() {
    let numstar = this.getaveragerating();
    numstar = Math.floor(numstar);
    console.log(numstar);
    const numstarstr = numstar.toString();
    console.log(numstarstr);
    if (Number(numstar) > 0) {
      return (
        <div>
          <div class="rating-stars" data-rating={numstarstr.toString()}></div>
          ({this.getaveragerating()}/5.00)
        </div>
      )
    }
    else {
      return (
        <div>
          <p> No reviews yet</p>
        </div>
      )
    }
  }

  render() {
    console.log(this.state);
    {
      if (this.state.returntouserpage) {
        return <Redirect to={{ pathname: '/user' }} />
      }
    }
    return (
      <div className="parkingdetail">
        <div className="bodyWrap">
          <div className="productStage">

            <div className="folderTab clearFix">
              <div className="breadCrumbs">
                Parking Spot Detail
            </div>
            </div>

            <div className="botBorder clearFix">
              <div className="productImage">
                <img src={this.state.picture} />
              </div>
              <div className="overview">
                <h1>{this.state.address}</h1>
                <h2>{this.state.city}, {this.state.province}</h2>
                <div className="rating">
                  {this.renderstars.bind(this)()}
                  {/* <img src={this.state.picture}/> */}
                </div>
                <br />
                {/* <span> 3 spots available</span> */}
                <div className="description">Description:<br />{this.state.description}</div>

                <div className="productbutton reserve" onClick={this.reserve}>Reserve</div>
              </div>

              <div className="info">
                <h3>Location Information</h3>
                <br />
                <ul className="specs">
                  <li><h5>Host Name:</h5> {this.state.hostname}</li>
                  <li><h5>Car types:</h5> {this.state.cartypes.join(", ")}</li>
                  <li><h5>Stall:</h5> #{this.state.stall}</li>
                  <li><h5>Buzzer:</h5> {this.state.buzzer}</li>
                  <li><h5>Address:</h5> {this.state.address}, {this.state.city}, {this.state.province}, {this.state.postalcode}</li>
                  <li><h5>MaxHeight:</h5> {this.state.maxheight}cm</li>
                </ul>

                <div className="description">
                  {this.state.description2}
                </div>
              </div>

              {/* <div className="info"> */}
                {/* {this.state.reviews && this.state.reviews.map(this.generatereviews)} */}
                {/*               
              this.generatereviews(this.state.reviews) */}
                {/* {this.checklogin.bind(this)()} */}
              {/* </div> */}

            </div>
          </div>
        </div>
      </div>
    );
  }
}