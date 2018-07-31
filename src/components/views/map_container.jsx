import React, { Component } from 'react';
import MapBox from './map.jsx';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: this.props.location.state
    }
  }
  render() {
    return (
      <h1>{this.state.results}</h1>
      // < MapBox />
    )
  }
}

export default MapContainer;