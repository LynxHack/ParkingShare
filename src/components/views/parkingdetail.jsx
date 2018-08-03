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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquam elementum est, at vestibulum augue consequat at. Donec euismod convallis felis. Nam sed molestie dolor. Proin in tortor sed augue consequat viverra.",
      description2: "Private area near the city center. Have easy access to nearby stores and fesitivities. Welcome!",
      address: "3800 Capistrano Dr.",
      city: "Kelowna",
      province: "B.C.",
      postalcode: "V6W 7U5",
      price: "5.00",
      picture: "http://www.jimmybeanswool.com/secure-html/onlineec/images/stars/4_5StarBlue09.gif",
      
      hostname: "John Smith",
      stall: "5",
      buzzer: "5010",
      maxheight: "250", //in cm for now
      cartypes: ["motorbike", "sedan/small pickup", "full pickup/SUV"]
    }
  }

  render() {
    return (       
      <div className="parkingdetail">
            <div class="bodyWrap">    
            <div class="productStage">
                
                <div class="folderTab clearFix">
            <div class="breadCrumbs">
              Parking Spot Detail
            </div>
            </div>
      
          <div class="botBorder clearFix">
              <div class="productImage">
                <img src="http://placehold.it/300x300"/>
                  <ul class="imageList">
                    <li><a href="#"><img src="http://placehold.it/92x92"/></a></li>
                    <li><a href="#"><img src="http://placehold.it/92x92"/></a></li>
                    <li><a href="#"><img src="http://placehold.it/92x92"/></a></li>
                  </ul>
                      <span><a href="#"><b>View More</b></a></span>
              </div>
              <div class="overview">
                <h1>{this.state.address}}</h1>
                <h2>{this.state.city}, {this.state.province}}</h2>
                <span class="rating">
                  <img src={this.state.picture}/>
                </span>
                <h3>${this.state.price} per hour</h3>
                <span>3 spots available</span>
                <span class="description">{this.state.description}</span>
        
                  <select class="prodSelect">
                    <option selected>Parking Spot Selection</option>
                    <option>Spot 1</option>
                    <option>Spot 2</option>
                    <option>Spot 3</option>
                    <option>Spot 4</option>
                  </select>
        
                <div class="productbutton reserve">Reserve</div>
      
                           
              </div>
                
             <div class="info">
                  <h3>Location Information</h3>
                  <ul class="specs">
                    <li><h5>Host Name:</h5> {this.state.hostname}</li>
                    <li><h5>Car types:</h5> {this.state.cartypes}</li>
                    <li><h5>Stall:</h5> #{this.state.stall}</li>
                    <li><h5>Buzzer:</h5> {this.state.buzzer}</li>
                    <li><h5>Address:</h5> {this.state.address}, {this.state.city}, {this.state.province}, {this.state.postalcode}</li>
                    <li><h5>MaxHeight:</h5> {this.state.maxheight}cm</li>
                  </ul>
                
                <div class="description">
                 {this.state.description2} 
                 </div> 
               </div> 
                
              <div class="info">
                  
               
                <div class="review">
                  <span class="title">Great space! 5/5
                  <br/><img class="stars" src="http://localhost.com/jblocal/secure-html/onlineec/images/stars/5StarBlue09.gif"/></span>
                  
                    <span class="comments">I reserved a spot here as I was struggling to find a spot for the beer festival happening downtown. It was at a convenient location. Terrific!</span>
                  <span class="author">By lulu5156 on December 31, 2013</span>
                    <div class="vote">
                     Was this review helpful?
                     <input type="submit" value="Yes"/>
                    </div>
               </div>
                  
                    <div class="review">
                      <span class="title">A little rough but nice! 4/5
                          <br/><img class="stars" src="http://localhost.com/jblocal/secure-html/onlineec/images/stars/4StarBlue09.gif"/></span>
        
                        <span class="comments">I booked this parking spot due to the convenient location. However, entering and exiting the space requires some skill.</span>
                      <span class="author">By Lucky67 on August 27, 2013</span>
                        
                        <div class="vote">
                         Was this review helpful?
                         <input type="submit" value="Yes"/>
                        </div>
                   </div>
                            
                            <div class="productbutton submit blueSubmit left">Write a Review</div> 
                   </div>                     
                  
                </div>  
             </div>
            </div> 
              
            <div class="sidebar slim">
              <div class="folderTab sub clearFix">
                <h3>Similar Items</h3>
              </div>
              <div class="botBorder">
                <div class="product vtop slim">
                    <a href="#">
                       <div class="smallBox"><img src="http://placehold.it/92x92"/></div>
                       <span class="manuName">Product Group</span>
                       <span class="prodName">Product Name</span>
                    </a>
                </div>
                  <div class="product vtop slim">
                    <a href="#">
                       <div class="smallBox"><img src="http://placehold.it/92x92"/></div>
                       <span class="manuName">Product Group</span>
                       <span class="prodName">Product Name</span>
                    </a>
                </div>
                <div class="product vtop slim">
                    <a href="#">
                       <div class="smallBox"><img src="http://placehold.it/92x92"/></div>
                       <span class="manuName">Product Group</span>
                       <span class="prodName">Product Name</span>
                    </a>
                </div>
                <div class="product vtop slim">
                    <a href="#">
                       <div class="smallBox"><img src="http://placehold.it/92x92"/></div>
                       <span class="manuName">Product Group</span>
                       <span class="prodName">Product Name</span>
                    </a>
                </div>
              </div>
            </div>
        </div>
        
  
    );
  }
}