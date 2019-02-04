import React, { Component } from 'react';

class Location extends Component {
  constructor(props) {
      super(props);

      this.state = {
        locationResult: ""
      }
  }

  getUserLocation = () => {
    const self = this;
    // Get User Location through WeChat
    this.props.wechatObj.callWechatApi('getLocation', {
      type: 'wgs84', // wgs84 is the default gps coordinates. If wish to return, import 'gcj02' directly as the Mars coordinates used for openLocation.
      success: function (res) {
        // Because it's a callback function, so it has not context of this
        self.setState({
          locationResult: JSON.stringify(res, null, "\t")
        });
      }
    });
  }

  openMap = () => {
    this.props.wechatObj.callWechatApi('openLocation', {
      latitude: 0, // Latitude, floating point, range is 90 ~ -90
      longitude: 0, // longitude, floating point, range is 180 ~ -180.
      name: '', // Location name
      address: '', // Address detail description
      scale: 1, // Map scale, alter value, range is 1~28. Default is maximum
      infoUrl: '' // Click on the hyperlink that appears at the bottom of the View Location screen
    });
  }

  render() {
    const { locationResult } = this.state;
    return (
        <>
          <button className="cta-btn" onClick={this.getUserLocation}>Get User Location</button>
          <div style={{marginBottom: 10, marginTop: 10}}>
            <code>{locationResult}</code>
          </div>
          <button className="cta-btn" onClick={this.openMap}>Open WeChat's map</button>
        </>
    );
  }
}

export default Location;
