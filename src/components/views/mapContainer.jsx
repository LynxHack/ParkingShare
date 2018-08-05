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

var features = [];
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
    // this.renderListings = this.renderListings.bind(this);
    // this.filter = this.filter.bind(this);
    // this.searchText = this.searchText.bind(this);
    this.onText = this.onText.bind(this);
    this.submitForm = this.submitForm.bind(this);
    // this.populateMap = this.populateMap.bind(this);
    // this.renderListings = this.renderListings.bind(this);
    this.geolookup = {}

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

    const { startdate, enddate } = this.state;

    await getSpots(startdate, enddate)
      .then((res) => {
        this.populateMap(res.data)
      })
  }

  populateMap = (data) => {
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
      this.geolookup[marker.id] = marker; //populate info lookup table

      await new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(`<h3>${marker.properties.address}</h3>
                    <p>${marker.properties.description}</p>
                    <a href='/parkingdetail' class='btn-outline-primary'>Reserve</a>
                    `))
        .addTo(this.map);

    });

    this.setState({
      featuresLoading: false
    })
  }

  // renderListings = (features) => {
  //   var filterEl = document.getElementById('feature-filter');
  //   var listingEl = document.getElementById('feature-listing');
  //   // Clear any existing listings
  //   listingEl.innerHTML = '';
  //   if (features.length) {
  //     features.forEach(function (feature) {
  //       var prop = feature.properties;
  //       var item = document.createElement('a');
  //       // SET HREF TO LISTING PAGE WHEN READY
  //       item.href = "#";
  //       item.target = '_blank';
  //       item.textContent = prop.address;
  //       listingEl.appendChild(item);
  //     });

  //     // Show the filter input
  //     filterEl.parentNode.style.display = 'block';
  //   } else {
  //     var empty = document.createElement('p');
  //     empty.textContent = 'Drag the map to populate results';
  //     listingEl.appendChild(empty);

  //     // Hide the filter input
  //     filterEl.parentNode.style.display = 'none';

  //     // remove features filter
  //     this.map.setFilter('parkingSpots');
  //   }
  // }


  // async searchText(data, evt) {
  //   await this.setState({
  //     searchText: data.target.value
  //   });
  // }


  // filter = () => {

  //   var value = this.state.searchText.trim().toLowerCase();

  //   // Filter visible features that don't match the input value.
  //   var filtered = features.filter(function (feature) {
  //     var name = feature.properties.address.trim().toLowerCase();
  //     return name.indexOf(value) > -1;
  //   });

  //   // Populate the sidebar with filtered results
  //   this.renderListings(filtered);

  //   // Set the filter to populate features into the layer.
  //   this.map.setFilter('parkingSpots', filtered.map((feature) => {
  //     return feature.address
  //   }));
  // }

  onText(evt) {
    this.setState({
      searchValue: evt.target.value
    });
  }

  submitForm = async (evt) => {
    evt.preventDefault();
    const { searchValue } = this.state;
    api.getMapData(searchValue)
      .then((data) => {
        this.map.flyTo({ center: [data.results[0], data.results[1]], zoom: 12 })
      })
      .catch((error) => console.log(error));
    getSpots(this.state.startdate, this.state.enddate)
      .then((res) => {
        this.populateMap(res.data)
      })
  }

  render() {
    if (this.state.redirect) { return (<Redirect to={{ pathname: '/parkingdetail', state: { data: this.geolookup[this.currselected] } }} />) }
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