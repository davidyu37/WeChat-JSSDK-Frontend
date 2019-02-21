import React, { Component } from 'react';
import axios from 'axios';

class Share extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: null
    };
  }
  
  componentDidMount() {
    this.checkParams();
  }

  checkParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const user = urlParams.get('user');
    console.log(user);
    if(user) {
        this.setState({
            user: JSON.parse(user)
        });
    }
  }

  login = async () => {
    const YourBackEndUrl = `http://192.168.1.102:4000/auth-link`;

    try {
        const { data } = await axios.get(YourBackEndUrl);
        window.location = data;
        
    } catch (error) {
        console.error(error);
    }

  }

  renderUserInfo = (user) => {
      const userInfo = []
      for(const key in user) {
        userInfo.push({label: key, value: user[key]});
      }

      console.log(userInfo);

      return (
          <div className="user-info-container">
            {
            userInfo.map((ui, index) => (
                <div key={index} className="user-info-row">
                    <div className="label">{ui.label}</div>
                    <div className="value">{ui.value}</div>
                </div>
            ))
            }
          </div>
      )
  }

  render() {
    const { user } = this.state;
    return (
        <div className="btn-container">
            {user ? 
            this.renderUserInfo(user)
            : 
            <button className="cta-btn" onClick={this.login}>Login</button>
            }
        </div>
    );
  }
}

export default Share;
