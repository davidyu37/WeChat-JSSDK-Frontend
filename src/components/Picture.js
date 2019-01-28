import React, { Component } from 'react';

class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      takePicture: null,
      albumPhotos: []
    };
  }

  takePicture = () => {
    const self = this;
    // Take picture through wechat
    self.props.wechatObj.callWechatApi('chooseImage', {
      count: 1, // Default 9
      sizeType: ['original'], // Can specify whether it is the original or compressed image, default includes both
      sourceType: ['camera'], // Can specify whether the source is an album or camera, default includes both
      success: function (res) {
        const { localIds } = res; // Returns to local ID list for the selected photo, localId can be used as the src attribute of img tag to display the image
        // this.props.wechatObj.callWechatApi('previewImage', {
        //     // current: localIds[0], // http link for currently displayed image
        //     // urls: [] // List of http links for images that need to be previewed
        // });
        self.setState({
            takenPicture: localIds[0]
        });
      }
    });
  }

  chooseFromAlbum = () => {
    // Pick photo from your phone's album
    const self = this;
    self.props.wechatObj.callWechatApi('chooseImage', {
      count: 9, // Default 9
      sizeType: ['original'], // Can specify whether it is the original or compressed image, default includes both
      sourceType: ['album'], // Can specify whether the source is an album or camera, default includes both
      success: function (res) {
        const { localIds } = res; // Returns to local ID list for the selected photo, localId can be used as the src attribute of img tag to display the image
        self.setState({
            albumPhotos: localIds
        })
      }
    });
  }

  render() {
    const { takenPicture, albumPhotos } = this.state;

    return (
        <div className="btn-container">
            <button className="cta-btn" onClick={this.takePicture}>Take Picture</button>
            { takenPicture ?
                <img alt="You Took This" className="sample-image" src={takenPicture}/> : null
            }
            <button className="cta-btn" onClick={this.chooseFromAlbum}>Choose from album</button>
            {albumPhotos.map(photo => <img alt="In Your Album" className="sample-image" src={photo}/>)}
            <button className="cta-btn">Preview Image</button>
            <button className="cta-btn">Upload Image</button>
            <button className="cta-btn">Download Image</button>
            <button className="cta-btn">Get Local Image</button>
        </div>
    );
  }
}

export default Picture;
