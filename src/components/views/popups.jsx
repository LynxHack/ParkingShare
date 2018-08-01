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

const Popups = ({ spot }) => {
  return (
    <Popup key={spot.id} coordinates={[spot.longitude, spot.latitude]}>
      <StyledPopup key="styledpopup">
        <div>{spot.address}</div>
      </StyledPopup>
    </Popup>
  )
}

export default Popups;