import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import { getSpots } from "./../helpers/mapData.js";
import Popups from './popups.jsx';
require('./../../stylesheets/map.scss');

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

const flyToOptions = {
  speed: 0.8
};

class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fitBounds: undefined,
      longitude: this.props.location.state[0],
      latitude: this.props.location.state[1],
      bounds: [],
      spots: [],
      zoom: [11],
    }
  }


  componentDidMount() {
    getSpots()
      .then((res) => {
        this.setState(({ spots }) => ({
          spots: {
            ...spots,
            ...res.data
          }
        }));
        console.log(res.data);
      })
      
      
  }

  onStyleLoad = (map) => {
    const { onStyleLoad } = this.props;
    return onStyleLoad && onStyleLoad(map);
  };

  onToggleHover = ( cursor, { map }) => {
    map.getCanvas().style.cursor = cursor;
  };

  markerClick = (spot) => {
    console.log(spot);
    
    this.setState({
      longitude: spot.longitude,
      latitude: spot.latitude,
      zoom: [13],
      spot: spot
    });
  };


  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1Ijoiam9yZGFuYW5kZXJzIiwiYSI6ImNqanN0dXJxNzQ2Nm8zcHJtY29ubmNlNjgifQ.OHKZuM9qFqHmJGWEgKXy6w"
    });
    const { fitBounds, spots, spot, longitude, latitude, zoom } = this.state;

    return (
      <Map
        key="mapboxComponent"
        style="mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
        fitBounds={fitBounds}
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        onStyleLoad={(map) => {
          map.loadImage('https://cdn2.iconfinder.com/data/icons/vehicle-type/1024/hatchback-512.png', (error, image) => {
            map.addImage('spot', image);
          });
        }}
        center={[longitude, latitude]}
        zoom={zoom}
        flyToOptions={flyToOptions}
      >
        <Layer key="Layers" type="symbol" id="marker" layout={{ "icon-image": "spot" }}>
          {Object.keys(spots).map((key, index) => (
            <Feature
              key={spots[key].id}
              onMouseEnter={this.onToggleHover.bind(this, 'pointer')}
              onMouseLeave={this.onToggleHover.bind(this, '')}
              onClick={this.markerClick.bind(this, spots[key])}
              coordinates={[spots[key].longitude, spots[key].latitude]}
            />
          ))}
        </Layer>
        {this.state.spot && <Popups spot={this.state.spot}/>}
      </Map>
    )
  }
}

export default MapContainer;