import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
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
    this.setState({
      longitude: spot.longitude,
      latitude: spot.latitude,
      zoom: [14],
      spot: spot
    });
  };


  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1Ijoiam9yZGFuYW5kZXJzIiwiYSI6ImNqanN0dXJxNzQ2Nm8zcHJtY29ubmNlNjgifQ.OHKZuM9qFqHmJGWEgKXy6w"
    });
    const { spots, spot, longitude, latitude, zoom } = this.state;

    return (
      <Map
        key="mapboxComponent"
        style="mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        onStyleLoad={this.onStyleLoad}
        center={[longitude, latitude]}
        zoom={zoom}
        flyToOptions={flyToOptions}
      >
        <Layer key="Layers" type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
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
        {spot && (
          <Popup key={spot.id} coordinates={[spot.longitude, spot.latitude]}>
            <StyledPopup key="styledpopup">
              <div>{spot.address}</div>
            </StyledPopup>
          </Popup>
        )}
      </Map>
    )
  }
}

export default MapContainer;