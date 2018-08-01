import React, { Component } from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import { getSpots } from "./../helpers/mapData.js";
require('./../../stylesheets/map.scss');

class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.testData = [{ "id": 17, "longitude": "-123.204866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.630Z", "updated_at": "2018-07-31T18:34:33.630Z", "typeid": null, "hostid": null }, { "id": 18, "longitude": "-123.202866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.631Z", "updated_at": "2018-07-31T18:34:33.631Z", "typeid": null, "hostid": null }, { "id": 19, "longitude": "-123.201866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.631Z", "updated_at": "2018-07-31T18:34:33.631Z", "typeid": null, "hostid": null }, { "id": 20, "longitude": "-123.200866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.634Z", "updated_at": "2018-07-31T18:34:33.634Z", "typeid": null, "hostid": null }, { "id": 21, "longitude": "-123.199866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.635Z", "updated_at": "2018-07-31T18:34:33.635Z", "typeid": null, "hostid": null }, { "id": 22, "longitude": "-123.198866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.636Z", "updated_at": "2018-07-31T18:34:33.636Z", "typeid": null, "hostid": null }, { "id": 23, "longitude": "-123.197866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.637Z", "updated_at": "2018-07-31T18:34:33.637Z", "typeid": null, "hostid": null }, { "id": 24, "longitude": "-123.196866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.638Z", "updated_at": "2018-07-31T18:34:33.638Z", "typeid": null, "hostid": null }, { "id": 25, "longitude": "-123.193866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.641Z", "updated_at": "2018-07-31T18:34:33.641Z", "typeid": null, "hostid": null }, { "id": 26, "longitude": "-123.195866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.639Z", "updated_at": "2018-07-31T18:34:33.639Z", "typeid": null, "hostid": null }, { "id": 27, "longitude": "-123.194866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.640Z", "updated_at": "2018-07-31T18:34:33.640Z", "typeid": null, "hostid": null }, { "id": 28, "longitude": "-123.190866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.642Z", "updated_at": "2018-07-31T18:34:33.642Z", "typeid": null, "hostid": null }, { "id": 29, "longitude": "-123.192866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.641Z", "updated_at": "2018-07-31T18:34:33.641Z", "typeid": null, "hostid": null }, { "id": 30, "longitude": "-123.191866", "latitude": "49.263466", "picture": "../images/kits.png", "stall": 11, "buzzer": 0, "description": "The parking spot is located behind the building.", "address": "4354 W 10th Ave", "city": "Vancouver", "postalcode": "V6R 2H7", "maxheight": 72, "created_at": "2018-07-31T18:34:33.641Z", "updated_at": "2018-07-31T18:34:33.641Z", "typeid": null, "hostid": null }]
    this.state = {
      longitude: this.props.location.state[0],
      latitude: this.props.location.state[1],
      bounds: [],
      spots: []
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
        console.log(this.state);
      })
  }


  render() {
    const Map = ReactMapboxGl({
      accessToken: "pk.eyJ1Ijoiam9yZGFuYW5kZXJzIiwiYSI6ImNqanN0dXJxNzQ2Nm8zcHJtY29ubmNlNjgifQ.OHKZuM9qFqHmJGWEgKXy6w"
    });
    const { spots, spot, longitude, latitude } = this.state;
    console.log(Map.defaultProps);
    
    return (
      <Map
        style="mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
        containerStyle={{
          height: '100vh',
          width: '100vw',
        }}
        center={[longitude, latitude]}>
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          {Object.keys(spots).map((key, index) => (
            <Feature
              key={spots[key].id}
              coordinates={[spots[key].longitude, spots[key].latitude]}
            />
          ))}
        </Layer>
        {spot && (
          <Popup key={station.id} coordinates={[spot.longitude, spot.latitude]}>
            <StyledPopup>
              <div>{spot.address}</div>
            </StyledPopup>
          </Popup>
        )}
      </Map>
    )
  }
}

export default MapContainer;