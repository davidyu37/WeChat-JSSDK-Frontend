import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import WechatJSSDK from 'wechat-jssdk/dist/client';

class App extends Component {
  componentWillMount() {
    const config = {
      //below are mandatory options to finish the wechat signature verification
      //the 4 options below should be received like api '/get-signature' above
      'appId': 'app_id',
      'nonceStr': 'your_nonceStr',
      'signature': 'url_signature',
      'timestamp': 'your_timestamp',
      //below are optional
      //invoked if wechat signature sign succeeds,
      //'this' will be the jssdk instance if it's a normal function, 
      // in v3.0.10+, jssdk instance will be passed to the callback, (wxObj) => {}
      // in the up coming v4, "success"/"error" init callback will be replace by #initialize() which will return Promise, see below
      'success': jssdkInstance => { },
      //invoked if sign failed, in v3.0.10+, jssdk instance will be pass to the func, (err, wxObj) => {}
      'error': (err, jssdkInstance) => { },
      //enable debug mode, same as debug
      'debug': true,
      'jsApiList': [], //optional, pass all the jsapi you want, the default will be ['onMenuShareTimeline', 'onMenuShareAppMessage']
      'customUrl': '' //set custom weixin js script url, usually you don't need to add this js manually
    }
    const wechatObj = new WechatJSSDK(config);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
