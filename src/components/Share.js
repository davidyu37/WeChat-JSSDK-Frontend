import React, { Component } from 'react';
import ReactLogo from '../react.png';

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'WeChat-JSSDK Demo',
      desc: 'Testing share card on WeChat',
      imgUrl: `${window.location.origin}${ReactLogo}`
    };
  }

  componentDidMount() {
      this.setShareMessage();
  }

  setShareMessage = () => {
    const self = this;
    const { title, desc, imgUrl } = this.state;
    // Demo share on Wechat
    self.props.wechatObj.shareOnChat({
      type: 'link',
      title,
      link: window.location.href.split('#')[0],
      imgUrl,
      desc,
      success: function () {
        // Sharing Success
        alert('shared');
      },
      cancel: function () {
        // Sharing cancelled
      }
    });
  }

  onChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    });
  }



  render() {
    return (
        <div className="input-container">
          {/* Dynamically setting sharing information */}
          <h1>Customize your share card</h1>
          <input onChange={this.onChange} placeholder="Title" name="title"/>
          <input onChange={this.onChange} placeholder="Description" name="desc"/>
          <input onChange={this.onChange} placeholder="Image URL" name="imgUrl"/>
          <button className="cta-btn" style={{alignSelf: 'center'}} onClick={this.setShareMessage}>Update Share Info</button>
        </div>
    );
  }
}

export default Share;
