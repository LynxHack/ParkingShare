import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { resolve } from 'url';
require('./../../stylesheets/map.scss');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.requestToken = this.requestToken.bind(this);
  }

  componentDidMount() {
    this.requestToken().then((token) => {
      mapboxgl.accessToken = token;
      const map = new mapboxgl.Map({
        container: "map",
        center: [-123.1092519, 49.2696751],
        zoom: 13,
        style: "mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
      });
    });
  }

  requestToken() {
    return new Promise((resolve, reject) => {
      fetch("http://localhost:8080/token")
        .then((response) => {
          return response.json();
        })
        .then((myJson) => {
          resolve(myJson);
        })
        .catch((error) => {
          console.log(`Error in fetching token : ${error}`);
        })
    })
  }

  render() {
    return (
      <div id="map">
      </div>
    )
  }
}

export default Map;