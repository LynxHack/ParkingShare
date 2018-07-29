import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
require('./../../stylesheets/map.scss');

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "didn't work",
      width: "500px",
      height: "500px"
    }
    this.requestToken = this.requestToken.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.height !== prevState.height || nextProps.width !== prevState.width) {
      return ({ height: nextProps.height, width: nextProps.width }) // <- this is setState equivalent
    }
    return null
  }

  async componentDidMount() {
    await this.requestToken();
    console.log(this.state.token);
    
    // mapboxgl.accessToken = 
    // const map = new mapboxgl.Map({
    //   container: "map",
    //   center: [-123.1092519, 49.2696751],
    //   zoom: 13,
    //   style: "mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
    // });
  }

  requestToken() {
    fetch('/token')
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        this.setState({ token: { myJson } });
      })
  }

  render() {
    return (
      <div id="map"></div>
    )
  }
}

export default Map;