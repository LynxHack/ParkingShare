require('./../../stylesheets/home.scss');

import React, { Component } from "react";
import { Redirect } from 'react-router';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      results: [],
      fireRedirect: false
    }
    this.onText = this.onText.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  onText(evt) {
    this.setState({
      searchValue: evt.target.value
    });
  }

  submitForm(evt) {
    evt.preventDefault();
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${this.state.searchValue}.json?country=ca&access_token=pk.eyJ1Ijoiam9yZGFuYW5kZXJzIiwiYSI6ImNqanN0dXJxNzQ2Nm8zcHJtY29ubmNlNjgifQ.OHKZuM9qFqHmJGWEgKXy6w`)
      .then((res) => {
        this.setState({
          results: [res.data.features[0].center[0], res.data.features[0].center[1]],
          fireRedirect: true
        })
      })
  }


  render() {
    const { from } = this.props.location.state || '/';
    const { fireRedirect } = this.state;
    return (
      <div id="welcome_text_div">
        <h1>Welcome To Your Spot</h1>
        <p>Rent out uninque parking spots all around the greatest city in the world.</p>

        <form className="search-container" onSubmit={this.submitForm}>
          <input type="text" id="search-bar" placeholder="Search for available locations here" onKeyDown={this.onText} />
          <img className="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png" />
        </form>
        {fireRedirect && (<Redirect to={{ pathname: '/search', state: this.state.results }} />)}
        <footer className='homefooter'>
        </footer>
      </div>
    );
  }
}