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
      type: 'link', // Share type, music, video link, not filled default link
      title,
      link: window.location.href.split('#')[0], // Share Link,this link domain name and path must be the same as the current page which corresponding to JS secured domain name as Official account
      imgUrl,
      desc,
      success: function () {
        // Sharing Success
        alert('shared');
      },
      cancel: function () {
        // Sharing cancelled
        alert('canceled');
      }
    });
    alert('Updated');
  }

  onChange = ({target: {name, value}}) => {
    this.setState({
      [name]: value
    });
  }



  render() {
    const { title, desc, imgUrl } = this.state;
    return (
        <div className="input-container">
          {/* Dynamically setting sharing information */}
          <h1>Customize your share card</h1>
          <input onChange={this.onChange} placeholder="Title" name="title" value={title}/>
          <input onChange={this.onChange} placeholder="Description" name="desc" value={desc}/>
          <input onChange={this.onChange} placeholder="Image URL" name="imgUrl" value={imgUrl}/>
          <button className="cta-btn" style={{alignSelf: 'center'}} onClick={this.setShareMessage}>Update Share Info</button>
        </div>
    );
  }
}

export default Share;
