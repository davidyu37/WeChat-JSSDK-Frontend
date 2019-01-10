import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import WechatJSSDK from 'wechat-jssdk/dist/client';

class App extends Component {
  componentWillMount() {
    this.requestForWeChatParams();
  }

  requestForWeChatParams = async () => {
    // Make sure it's the url that you have whitelisted in WeChat Official Account Dashboard
    const url = window.location.href.split('#')[0];

    // If you want to test on your device, be sure to use your IP address instead of localhost
    const YourBackEndUrl = `http://localhost:4000/get-signature?url=${encodeURIComponent(url)}`

    try {
      const { data } = await axios.get(YourBackEndUrl);

      const config = {
        //below are mandatory options to finish the wechat signature verification
        //the 4 options below should be received like api '/get-signature' above
        'appId': data.appId,
        'nonceStr': data.nonceStr,
        'signature': data.signature,
        'timestamp': data.timestamp,
        //below are optional
        'success': jssdkInstance => { console.log('success', jssdkInstance) },
        'error': (err, jssdkInstance) => { console.log('failed', jssdkInstance) },
        //enable debug mode, same as debug
        'debug': true,
        'jsApiList': [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'startRecord',
          'stopRecord',
          'onVoiceRecordEnd',
          'playVoice',
          'pauseVoice',
          'stopVoice',
          'onVoicePlayEnd',
          'uploadVoice',
          'downloadVoice',
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage',
          'translateVoice',
          'getNetworkType',
          'openLocation',
          'getLocation',
          'hideOptionMenu',
          'showOptionMenu',
          'hideMenuItems',
          'showMenuItems',
          'hideAllNonBaseMenuItem',
          'showAllNonBaseMenuItem',
          'closeWindow',
          'scanQRCode',
          'chooseWXPay',
          'openProductSpecificView',
          'addCard',
          'chooseCard',
          'openCard'
        ], //optional, pass all the jsapi you want, the default will be ['onMenuShareTimeline', 'onMenuShareAppMessage']
        'customUrl': '' //set custom weixin js script url, usually you don't need to add this js manually
      }
      const wechatObj = new WechatJSSDK(config);

      await wechatObj.initialize();

      // Usually you want to create a wrapper component or set it as a window variable to use wechatObj everywhere else without reinitializing it.

      // Demo share on Wechat
      wechatObj.shareOnChat({
        type: 'link',
        title: 'TITLE',
        link: window.location.href,
        // Using external image link for testing because the site is not hosted on the internet yet
        imgUrl: 'https://www.baidu.com/img/bd_logo1.png?where=super',
        desc: 'description123',
        success: function () {
          alert('shared');
        },
        cancel: function () { }
      });

      // Demo Get User Location through WeChat
      wechatObj.callWechatApi('getLocation', {
        type: 'wgs84', // wgs84 is the default gps coordinates. If wish to return, import 'gcj02' directly as the Mars coordinates used for openLocation.
        success: function (res) {
          var latitude = res.latitude; // latitude, floating point, range is 90 ~ -90
          var longitude = res.longitude; // longitude, floating point, range is 180 ~ -180.
          var speed = res.speed; // speed, calculated in meter per second
          var accuracy = res.accuracy; // location accuracy

          console.log(res);
        }
      });

      // View the official document for other methods: https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
      
    } catch (error) {
      console.log(error);
      alert(error)
    }

    

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
