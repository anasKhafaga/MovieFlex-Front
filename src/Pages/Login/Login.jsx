import React, { Component } from 'react';
import signupImg from '../../assets/signupImg.jpg';
import signupBack from '../../assets/pcBack.jpg';
import './Login.css';
import axios from 'axios';
import { WlLoading, Error } from '../../Components';
import { Link, Redirect } from 'react-router-dom';

export default class Signup extends Component {
  state = {
    username: '',
    password: '',
    wrongMsgusername: '',
    wrongMsgpassword: '',
    loading: false,
    error: '',
    success: false,
    token: ''
  };

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  login = (e) => {
    e.preventDefault();
    if (
      !this.state.username ||
      !this.state.password ||
      this.state.wrongMsgpassword ||
      this.state.wrongMsgusername
    ) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/auth/login`, {
        username: this.state.username,
        password: this.state.password,
      })
      .then((success) => {
        localStorage.setItem('mfToken', `Bearer ${success.data.token}`);
        localStorage.setItem('mfWl', success.data.watchlist);
        this.setState({
          success: true,
          token: `Bearer ${success.data.token}`,
        });
      })
      .catch((err) => {
        this.setState({
          error: err.response.data.message,
          loading: false,
        });
      });
    this.setState({
      loading: true,
    });
  };

  focusOut = (e) => {
    const { id, name, value } = e.target;
    if (value.length === 0) {
      document.getElementById(`${id}`).classList.add('wrongInput');
      document.getElementById(`${id}`).classList.remove('correctInput');
      this.updateState(`wrongMsg${name}`, 'Field is required');
    } else {
      this.updateState(name, value);
      document.getElementById(`${id}`).classList.add('correctInput');
      document.getElementById(`${id}`).classList.remove('wrongInput');
      this.updateState(`wrongMsg${name}`, '');
    }
  };

  render() {
    // if (!this.props.location.state) {
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: '/'
    //       }}
    //     />
    //   );
    // }
    if (this.state.success) {
      return <Redirect to={{
          pathname: "/",
          state: {token: this.state.token}
        }} />
    }
    let error;
    if (this.state.error) {
      error = <Error>{this.state.error}</Error>;
    }
    return (
      <div className="suPage">
        <div className="suContent">
          <div className="formBody">
            <div className="suImgPc">
              <div className="suCPc"></div>
              <img src={signupImg} alt="signup" className="suImgPc" />
            </div>
            <div className="suContForm lgContForm">
              <h2>LOG IN</h2>
              <div className="errorBoxSu">{error}</div>
              <form method="POST" onSubmit={this.login} className="signupForm">
                <div className="formComp">
                  <label htmlFor="Username">Username*</label>
                  <div>
                    <input
                      id="1"
                      onBlur={this.focusOut}
                      min="3"
                      max="10"
                      out
                      type="text"
                      placeholder="Enter username"
                      name="username"
                    />
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <p>{this.state.wrongMsgusername}</p>
                </div>
                <div className="formComp">
                  <label htmlFor="Password">Password*</label>
                  <div>
                    <input
                      onBlur={this.focusOut}
                      id="3"
                      placeholder="Enter Password"
                      name="password"
                      type="password"
                    />
                    <i class="fas fa-key"></i>
                  </div>
                  <p>{this.state.wrongMsgpassword}</p>
                </div>
                <div className="formComp">
                  {this.state.loading ? (
                    <WlLoading class="suWlLoading" />
                  ) : (
                    <button
                      type="submit"
                      className="btn"
                      style={{ fontSize: '1.2em', fontWeight: 'bold' }}
                    >
                      LOG IN
                    </button>
                  )}
                </div>
              </form>
              <p className="haveAcc">
                Don't have an Account?<Link to="/signup">Join Us</Link>
              </p>
            </div>
          </div>
          <div className="suBack">
            <div className="suBackShadow"></div>
            <div className="suBackColor"></div>
            <img src={signupBack} className="suBackPc" />
            <img src={signupImg} alt="signup" className="suBackImg" />
          </div>
        </div>
      </div>
    );
  }
}
