import React, { Component } from 'react';
import MapBox from './map.jsx';

class MapContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      < MapBox />
    )
  }
}

export default MapContainer;