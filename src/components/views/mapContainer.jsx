import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';
ThemedStyleSheet.registerTheme(DefaultTheme);

import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { getSpots } from "./../helpers/mapData.js";
import { DateRangePicker } from 'react-dates';
import moment from 'moment';
import api from './../helpers/api.js';
import { Redirect } from 'react-router';
import { FeatureListItem } from './_featureListItem.jsx';

require('./../../stylesheets/map.scss');

let features = [];
let bounds = [];
class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.map;
    this.state = {
      focusedInput: null,
      startDateId: 'startdate',
      endDateId: 'enddate',
      searchValue: '',
      results: [],
      longitude: this.props.location.state[0],
      latitude: this.props.location.state[1],
      startdate: moment(this.props.location.state[2]),
      enddate: moment(this.props.location.state[3]),
      mapBounds: {},
      searchText: '',
      featuresLoading: true,
      redirect: false
    }
    this.onText = this.onText.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.geolookup = {};
    var self = this;
  }

  componentDidMount = async () => {
    //Initailiasing map in component
    mapboxgl.accessToken = "pk.eyJ1Ijoiam9yZGFuYW5kZXJzIiwiYSI6ImNqanN0dXJxNzQ2Nm8zcHJtY29ubmNlNjgifQ.OHKZuM9qFqHmJGWEgKXy6w";

    this.map = new mapboxgl.Map({
      container: "map",
      center: [this.state.longitude, this.state.latitude],
      zoom: 12,
      style: "mapbox://styles/jordananders/cjk7bfdek7ceu2rlkbyq440qp"
    });

    bounds = await this.map.getBounds().toArray()
    let { startdate, enddate } = this.state;
    await getSpots(JSON.stringify(bounds), startdate, enddate)
      .then((res) => {
        this.populateMap(res.data)
      })

    this.map.on('moveend', async (e) => {
      bounds = await this.map.getBounds().toArray();
      getSpots(JSON.stringify(bounds), this.state.startdate, this.state.enddate)
        .then((res) => {
          this.populateMap(res.data);
        })
    })
  }

  populateMap = async (data) => {

    var listItems = Array.prototype.slice.call(document.querySelectorAll('.list-group-item'));
    listItems.forEach(function (item) {
      item.parentNode.removeChild(item);
    });

    var mapMarkers = Array.prototype.slice.call(document.querySelectorAll('div.mapboxgl-marker'));
    console.log(mapMarkers);
    
    mapMarkers.forEach(function (item) {
      console.log(`remove${item}`);
      
      item.parentNode.removeChild(item);
    });

    data.map((spot) => {
      features.push({
        "id": spot.id,
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [spot.longitude, spot.latitude]
        },
        "properties": {
          picture: spot.picture,
          stall: spot.stall,
          buzzer: spot.buzzer,
          description: spot.description,
          address: spot.address,
          city: spot.city,
          postalcode: spot.postalcode,
          maxheight: spot.maxheight,
          id: spot.id
        },
      })
    });

    var geojson = {
      type: 'FeatureCollection',
      features: features
    }


    geojson.features.forEach(async (marker) => {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = `${marker.id}`;
      // this.geolookup[marker.id] = marker; //populate info lookup table

      var str = ``;
      for (var key in marker) {
          if (str != ``) {
              str += `&`;
          }
          str += key + `=` + marker[key];
      }

      await new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<h3>${marker.properties.address}</h3>
                    <p>${marker.properties.description}</p>
                    <a href='/parkingdetail?id=${marker.id} class='btn-outline-primary'>Reserve</a>
                    `))
        .addTo(this.map);
    });
  
    this.setState({
      featuresLoading: false
    })

  }

  serialize(obj){
    var str = ``;
    for (var key in obj) {
        if (str != ``) {
            str += `&`;
        }
        str += key + `=` + encodeURIComponent(obj[key]);
    }
    return str;
  }

  onText(evt) {
    this.setState({
      searchValue: evt.target.value
    });
  }

  submitForm = async (evt) => {
    evt.preventDefault();
    const { searchValue } = this.state;
    await api.getMapData(searchValue)
      .then((data) => {
        this.map.flyTo({ center: [data.results[0], data.results[1]], zoom: 12 })
      })
      .catch((error) => console.log(error));
  }

  // .then(async () => {
  //   return getSpots(JSON.stringify(bounds), this.state.startdate, this.state.enddate)
  // })
  // .then((res) => {
  //   console.log(res.data);
  // })

  render() {
    // console.log(this.geolookup);
    // if (this.state.redirect) { return (<Redirect to={{ pathname: '/parkingdetail', state: { data: this.geolookup[this.currselected] } }} />) }

    return (
      <section>
        <div id="map"></div>
        <div id="list-group">
          <section className="searchmap">
            <form className="search-container" onSubmit={this.submitForm}>
              <input type="text" id="search-bar" placeholder="Search for available locations here" onKeyDown={this.onText} />
              <img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" />
            </form>
            <div id="dateselectmap">
              <DateRangePicker
                startDate={this.state.startdate} // momentPropTypes.momentObj or null,
                startDateId={this.state.startDateId} // PropTypes.string.isRequired,
                endDate={this.state.enddate} // momentPropTypes.momentObj or null,
                endDateId={this.state.endDateId} // PropTypes.string.isRequired,
                onDatesChange={({ startDate, endDate }) => this.setState({ startdate, enddate })} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                regular={true}
              />
            </div>
          </section>
          <div id="featurelist">
            {!this.state.featuresLoading && features.map((e) => {
              return FeatureListItem(e)
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default MapContainer;