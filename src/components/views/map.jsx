import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
require('./../../stylesheets/map.scss');


class MapBox extends Component {

  constructor(props) {
    super(props);
    this.map;
    this.state = {
      longitude: this.props.location.state[0],
      latitude: this.props.location.state[1],
      mapBounds: {}
    }
  }

  componentDidMount() {

    mapboxgl.accessToken = "pk.eyJ1Ijoiam9yZGFuYW5kZXJzIiwiYSI6ImNqanN0dXJxNzQ2Nm8zcHJtY29ubmNlNjgifQ.OHKZuM9qFqHmJGWEgKXy6w";
    this.map = new mapboxgl.Map({
      container: "map",
      center: [this.state.longitude, this.state.latitude],
      zoom: 13,
      style: "mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
    });

    this.map.on('load', async () => {
      this.setState({
        mapBounds: this.map.getBounds()
      })

      axios.get(`/db/spots`)
        .then((res) => {
          if (error) throw error;
          res.forEach(element => {
            
          });
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    });
  }

  render() {
    return (
      <div id="map"></div>
    )
  }
}

export default MapBox;