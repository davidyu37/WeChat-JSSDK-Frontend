import React, { Component } from 'react';

class Location extends Component {
  constructor(props) {
      super(props);
  }

  getUserLocation = () => {
    // Get User Location through WeChat
    this.props.wechatObj.callWechatApi('getLocation', {
      type: 'wgs84', // wgs84 is the default gps coordinates. If wish to return, import 'gcj02' directly as the Mars coordinates used for openLocation.
      success: function (res) {
        var latitude = res.latitude; // latitude, floating point, range is 90 ~ -90
        var longitude = res.longitude; // longitude, floating point, range is 180 ~ -180.
        var speed = res.speed; // speed, calculated in meter per second
        var accuracy = res.accuracy; // location accuracy

        console.log(res);
      }
    });
  }

  render() {
    return (
        <button className="cta-btn" onClick={this.getUserLocation}>Get User Location</button>
    );
  }
}

export default Location;
