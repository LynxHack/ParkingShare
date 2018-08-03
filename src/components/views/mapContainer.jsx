import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import { getSpots } from "./../helpers/mapData.js";
import { Redirect } from 'react-router';

require('./../../stylesheets/map.scss');

var features = [];
class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.map;
    this.state = {
      longitude: this.props.location.state[0],
      latitude: this.props.location.state[1],
      startdate: this.props.location.state[2],
      enddate: this.props.location.state[3],
      mapBounds: {},
      searchText: '',
      redirect: false
    }
    this.renderListings = this.renderListings.bind(this);
    this.filter = this.filter.bind(this);
    this.searchText = this.searchText.bind(this);
    this.geolookup = {}
    this.currselected = 0;

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
        res.data.map(spot => {
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
              maxheight: spot.maxheight
            },
          })
        });
      })

    var geojson = {
      type: 'FeatureCollection',
      features: features
    }


    await geojson.features.forEach((marker) => {
      var self = this;
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = `${marker.id}`;
      this.geolookup[marker.id] = marker; //populate info lookup table

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(this.map);

      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + marker.properties.address + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(this.map);


      el.addEventListener('click', function(e){
        const markerid = e.target.className.split(" ")[0];
        self.currselected = markerid;
        self.setState({redirect: true});
        console.log(self.geolookup[markerid]);
      })

    });

    this.map.on('load', () => {
      var filterEl = document.getElementById('feature-filter');
      var listingEl = document.getElementById('feature-listing');
      this.renderListings(features, filterEl, listingEl);
    })
  }

  renderListings = (features, filterEl, listingEl) => {
    // Clear any existing listings
    listingEl.innerHTML = '';
    if (features.length) {
      features.forEach(function (feature) {
        var prop = feature.properties;
        var item = document.createElement('a');
        // SET HREF TO LISTING PAGE WHEN READY
        item.href = "#";
        item.target = '_blank';
        item.textContent = prop.address;
        listingEl.appendChild(item);
      });

      // Show the filter input
      filterEl.parentNode.style.display = 'block';
    } else {
      var empty = document.createElement('p');
      empty.textContent = 'Drag the map to populate results';
      listingEl.appendChild(empty);

      // Hide the filter input
      filterEl.parentNode.style.display = 'none';

      // remove features filter
      this.map.setFilter('parkingSpots');
    }
  }


  async searchText(data, evt) {
    await this.setState({
      searchText: data.target.value
    });
  }


  filter = () => {

    var value = this.state.searchText.trim().toLowerCase();

    // Filter visible features that don't match the input value.
    var filtered = features.filter(function (feature) {
      var name = feature.properties.address.trim().toLowerCase();
      return name.indexOf(value) > -1;
    });

    // Populate the sidebar with filtered results
    this.renderListings(filtered);

    // Set the filter to populate features into the layer.
    this.map.setFilter('parkingSpots', filtered.map((feature) => {
      return feature.address
    }));
  }

  render() {
    if (this.state.redirect)
            return (<Redirect to={{
                pathname: '/parkingdetail',
                state: { data: this.geolookup[this.currselected]}
    }} />)
    return (
      <section>
        <div id="map"></div>
        {/* <div className='map-overlay'>
          <fieldset onChange={this.searchText} onKeyDown={this.filter}>
            <input id='feature-filter' type='text' placeholder='Filter results by name' />
          </fieldset>
          <div id='feature-listing' className='listing'></div>
        </div> */}
      </section>
    )
  }
}

export default MapContainer;