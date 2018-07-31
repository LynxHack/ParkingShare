import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
require('./../../stylesheets/map.scss');

class MapBox extends Component {

  constructor(props) {
    super(props);
    this.testData = [{ "id": 17, "longitude": "-123.204866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.630Z", "updated_at": "2018-07-31T18:34:33.630Z", "typeid": null, "hostid": null }, { "id": 18, "longitude": "-123.202866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.631Z", "updated_at": "2018-07-31T18:34:33.631Z", "typeid": null, "hostid": null }, { "id": 19, "longitude": "-123.201866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.631Z", "updated_at": "2018-07-31T18:34:33.631Z", "typeid": null, "hostid": null }, { "id": 20, "longitude": "-123.200866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.634Z", "updated_at": "2018-07-31T18:34:33.634Z", "typeid": null, "hostid": null }, { "id": 21, "longitude": "-123.199866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.635Z", "updated_at": "2018-07-31T18:34:33.635Z", "typeid": null, "hostid": null }, { "id": 22, "longitude": "-123.198866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.636Z", "updated_at": "2018-07-31T18:34:33.636Z", "typeid": null, "hostid": null }, { "id": 23, "longitude": "-123.197866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.637Z", "updated_at": "2018-07-31T18:34:33.637Z", "typeid": null, "hostid": null }, { "id": 24, "longitude": "-123.196866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.638Z", "updated_at": "2018-07-31T18:34:33.638Z", "typeid": null, "hostid": null }, { "id": 25, "longitude": "-123.193866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.641Z", "updated_at": "2018-07-31T18:34:33.641Z", "typeid": null, "hostid": null }, { "id": 26, "longitude": "-123.195866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.639Z", "updated_at": "2018-07-31T18:34:33.639Z", "typeid": null, "hostid": null }, { "id": 27, "longitude": "-123.194866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.640Z", "updated_at": "2018-07-31T18:34:33.640Z", "typeid": null, "hostid": null }, { "id": 28, "longitude": "-123.190866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.642Z", "updated_at": "2018-07-31T18:34:33.642Z", "typeid": null, "hostid": null }, { "id": 29, "longitude": "-123.192866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.641Z", "updated_at": "2018-07-31T18:34:33.641Z", "typeid": null, "hostid": null }, { "id": 30, "longitude": "-123.191866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.641Z", "updated_at": "2018-07-31T18:34:33.641Z", "typeid": null, "hostid": null }]
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
      zoom: 10,
      style: "mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
    });

    this.map.on('load', () => {
      // Get GPS boundaries displayed on screen
      this.setState({
        mapBounds: this.map.getBounds()
      })
      const ax = axios.create({
        baseURL: "http://localhost:8080"
      })
      // add markers to map sent from server
      ax.get("/db/spots", {
        params: {
          bounds: this.state.mapBounds
        }
      })
        .then((response) => {
          response.data.forEach(marker => {
            // create a DOM element for the marker
            var el = document.createElement('div');
            el.className = 'marker';

            el.addEventListener('click', function () {
              window.alert(marker.address);
            });

            // add marker to map
            new mapboxgl.Marker(el)
              .setLngLat([marker.longitude, marker.latitude])
              .addTo(map);
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