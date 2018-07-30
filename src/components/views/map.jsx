import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import requestToken from './../helpers/request_token.js';
require('./../../stylesheets/map.scss');

class MapBox extends Component {

  constructor(props) {
    super(props);
    this.map;
    this.state = {
    }
  }

  async componentDidMount() {

    await requestToken().then((token) => {
      mapboxgl.accessToken = token;
    }).catch((err) => {
      console.log('failed ', err); // { error: 'Error in fetching token from server' }
    });

    this.map = await new mapboxgl.Map({
      container: "map",
      center: [-123.1092519, 49.2696751],
      zoom: 13,
      style: "mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
    });

    this.map.on('load', () => {
      this.map.loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Cat_silhouette.svg/400px-Cat_silhouette.svg.png', (error, image) => {
        if (error) throw error;
        this.map.addImage('cat', image);
        this.map.addLayer({
          "id": "points",
          "type": "symbol",
          "source": {
            "type": "geojson",
            "data": {
              "type": "FeatureCollection",
              "features": [{
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [-123.1092519, 49.2696751]
                }
              }]
            }
          },
          "layout": {
            "icon-image": "cat",
            "icon-size": 0.25
          }
        });
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