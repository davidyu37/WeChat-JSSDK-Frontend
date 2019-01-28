import React, { Component } from 'react';
import ReactLogo from '../react.png';

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
      this.listenToShareEvent();
  }

  listenToShareEvent = () => {
    const self = this;
    // Demo share on Wechat
    self.props.wechatObj.shareOnChat({
      type: 'link',
      title: 'WeChat-JSSDK Demo',
      link: window.location.href,
      // Using external image link for testing because the site is not hosted on the internet yet
      imgUrl: `${window.location.origin}${ReactLogo}`,
      desc: 'Testing share card on WeChat',
      success: function () {
        // Sharing Success
        alert('shared');
      },
      cancel: function () {
        // Sharing cancelled
      }
    });
  }

  render() {
    return (
        <div className="btn-container">
            {/* Dynamically setting sharing information */}
        </div>
    );
  }
}

export default Share;
