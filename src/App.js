import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// WeChat JSSDK Official Document: https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
import WechatJSSDK from 'wechat-jssdk/dist/client';

import Login from './components/Login';
import config from './config';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isWeChat: false,
      wxJSSDKerr: null,
      wechatObj: null
    };
  }

  componentWillMount() {
    // Browser Check
    const isWechat = this.isWithinWeChat();
    if(isWechat) {
      this.requestForWeChatParams();
    }
  }

  isWithinWeChat = () => {
    const ua = navigator.userAgent.toLowerCase();
    // is within wechat
    // micromessenger is the keyword that indicates it's within wechat
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
      this.setState({
        isWeChat: true
      });
      return true;
    }
    return false;
  }

  requestForWeChatParams = async () => {
    // Make sure it's the url that you have whitelisted in WeChat Official Account Dashboard
    const url = window.location.href.split('#')[0];

    // If you want to test on your device, be sure to use your IP address instead of localhost
    const YourBackEndUrl = `${config.backendUrl}/get-signature?url=${encodeURIComponent(url)}`

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
        'debug': false,
        // Tell WeChat what functionalities you would like to use
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
      this.setState({
        wechatObj,
        loading: false,
      });
    } catch (error) {
      console.log({ error });
      this.setState({
        wxJSSDKerr: error,
        loading: false,
      });
    }
  }

  render() {
    const { wxJSSDKerr, wechatObj, loading, isWeChat } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          WeChat JSSDK Demo
        </header>
        {!isWeChat ? <div style={{paddingTop: '40px'}}>Please open in WeChat</div> : null}
        {/* WeChat JSSDK successfully initiated */}
        {wechatObj && !loading ? 
          <div>
            <div style={{paddingTop: '40px'}}>
              WeChat JSSDK is Ready
              <Login wechatObj={wechatObj} />
            </div>
          </div> :
          // WeChat JSSDK failed or the website is not within WeChat
          <div style={{paddingTop: '40px'}}>
            {wxJSSDKerr ? JSON.stringify(wxJSSDKerr) : null}
          </div>
        }
      </div>
    );
  }
}

export default App;
