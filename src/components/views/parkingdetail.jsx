require('./../../stylesheets/parkingdetail.scss');
import axios from 'axios';
import React, { Component } from "react";
import api from './../helpers/api.js'

import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";

export default class ParkingDetail extends Component {
  constructor(props){
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

      reviews: []
    }
    self = this;
  }

  componentDidMount(){
    
    var query = this.props.location;
    var params = {query}
    var parkingid = params.query.search.slice(1).split('%')[0].split('=')[1];
    console.log("The id of parking lot is", parkingid);
    axios.post('/parkingid', {parkingid: parkingid})
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
          maxheight: result.data[0].maxheight}), self.returnreviews(parkingid)
    
        })
    .catch((err) => {
      console.log(err);
    })
  }

  returnreviews(parkingid){
    axios.post('/getreviews', {parkingid: parkingid})
    .then((result) => {
      console.log("Review results for ", parkingid)
      console.log(result);
      for(var i = 0; i < result.data.length; i++){
        this.setState(prevState => ({
          reviews: [...prevState.reviews, result.data[i]]
        }))
    }
    })
  }

  generatereviews(review){
    console.log("generating review card for");
    console.log(review);
    return(
      // <Review rating={review.rating} comment={review.description} author={`${review.firstname} ${review.lastname}`} datecreated={review.created_at}/>
      <div className="review">
      <span className="title">{review.rating}/5
      <br/><img className="stars" src="http://localhost.com/jblocal/secure-html/onlineec/images/stars/5StarBlue09.gif"/></span>
      
        <span className="comments">{review.description}</span>
      <span className="author">By {review.firstname} {review.lastname}} on {review.created_at}</span>
        <div className="vote">
         Was this review helpful?
         <input type="submit" value="Yes"/>
        </div>
   </div>
    )
  }

  reserve(){
    console.log()
    axios.post('/reserve', {parkingid: self.state.parkingid})
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    console.log(this.state);
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
                <img src="http://placehold.it/300x300"/>
                  <ul className="imageList">
                    <li><a href="#"><img src="http://placehold.it/92x92"/></a></li>
                    <li><a href="#"><img src="http://placehold.it/92x92"/></a></li>
                    <li><a href="#"><img src="http://placehold.it/92x92"/></a></li>
                  </ul>
                      <span><a href="#"><b>View More</b></a></span>
              </div>
              <div className="overview">
                <h1>{this.state.address}}</h1>
                <h2>{this.state.city}, {this.state.province}}</h2>
                <span className="rating">
                  <img src={this.state.picture}/>
                </span>
                <h3>${this.state.price} per hour</h3>
                <span>3 spots available</span>
                <span className="description">{this.state.description}</span>
        
                  <select className="prodSelect">
                    <option selected>Parking Spot Selection</option>
                    <option>Spot 1</option>
                    <option>Spot 2</option>
                    <option>Spot 3</option>
                    <option>Spot 4</option>
                  </select>
        
                <div className="productbutton reserve" onClick={this.reserve}>Reserve</div>
      
                           
              </div>
                
             <div className="info">
                  <h3>Location Information</h3>
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
                
              <div className="info">
              {this.state.reviews && this.state.reviews.map(this.generatereviews)}
{/*               
              this.generatereviews(this.state.reviews) */}
                            
                    <div className="productbutton submit blueSubmit left">Write a Review</div> 
                   </div>                     
                  
                </div>  
             </div>
            </div> 
              
            <div className="sidebar slim">
              <div className="folderTab sub clearFix">
                <h3>Similar Items</h3>
              </div>
              <div className="botBorder">
                <div className="product vtop slim">
                    <a href="#">
                       <div className="smallBox"><img src="http://placehold.it/92x92"/></div>
                       <span className="manuName">Product Group</span>
                       <span className="prodName">Product Name</span>
                    </a>
                </div>
                  <div className="product vtop slim">
                    <a href="#">
                       <div className="smallBox"><img src="http://placehold.it/92x92"/></div>
                       <span className="manuName">Product Group</span>
                       <span className="prodName">Product Name</span>
                    </a>
                </div>
                <div className="product vtop slim">
                    <a href="#">
                       <div className="smallBox"><img src="http://placehold.it/92x92"/></div>
                       <span className="manuName">Product Group</span>
                       <span className="prodName">Product Name</span>
                    </a>
                </div>
                <div className="product vtop slim">
                    <a href="#">
                       <div className="smallBox"><img src="http://placehold.it/92x92"/></div>
                       <span className="manuName">Product Group</span>
                       <span className="prodName">Product Name</span>
                    </a>
                </div>
              </div>
            </div>
        </div>
    );
  }
}