import React, { Component } from 'react';
import { Popup } from "react-mapbox-gl";
import styled from 'styled-components';
require('./../../stylesheets/map.scss');

const StyledPopup = styled.div`
  background: white;
  color: #3f618c;
  font-weight: 400;
  padding: 5px;
  border-radius: 2px;
`;

class Popups extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Popup key={this.props.id} coordinates={[this.props.longitude, this.props.latitude]}>
        <StyledPopup key="styledpopup">
          <div>{this.props.address}</div>
        </StyledPopup>
      </Popup>


    )
  }
}

export default Popups;