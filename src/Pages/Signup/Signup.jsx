import React, { Component } from 'react'
import signupImg from '../../assets/signupImg.jpg'
import signupBack from '../../assets/pcBack.jpg';
import emailImg from '../../assets/email.svg'
import './Signup.css';
import axios from 'axios';
import { WlLoading, Error, PopMn } from '../../Components'
import { Link, Redirect } from 'react-router-dom';

export default class Signup extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    wrongMsgusername: '',
    wrongMsgemail: '',
    wrongMsgpassword: '',
    wrongMsgfirst: '',
    wrongMsglast: '',
    loading: false,
    error: '',
    timer: 5,
    redirect: false
  };

  updateState = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  signup = (e) => {
    e.preventDefault();
    if (
      !this.state.username ||
      !this.state.email ||
      !this.state.password ||
      this.state.wrongMsgemail ||
      this.state.wrongMsgpassword ||
      this.state.wrongMsgfirst_name ||
      this.state.wrongMsglast_name ||
      this.state.wrongMsgusername
    ) {
      return;
    }
    axios
      .post(`${process.env.REACT_APP_API_DOMAIN}/auth/signup`, {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
      })
      .then((success) => {
        document
          .getElementsByClassName('moviePop')[0]
          .classList.add('moviePopShow');
        const counter = setInterval(() => {
          this.setState({
            timer: this.state.timer - 1,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(counter);
          this.setState({
            redirect: true
          });
        }, 5000);
        this.setState({
          loading: false,
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
    if (name === 'username') {
      if (value.length < 3 || value.length > 10) {
        document.getElementById(`${id}`).classList.add('wrongInput');
        document.getElementById(`${id}`).classList.remove('correctInput');
        this.updateState(
          `wrongMsg${name}`,
          'Username must be between 3 to 10 chars'
        );
      } else {
        document.getElementById(`${id}`).classList.add('correctInput');
        document.getElementById(`${id}`).classList.remove('wrongInput');
        this.updateState(`wrongMsg${name}`, '');
        this.updateState(name, value);
      }
    } else if (name === 'email') {
      if (
        !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          value
        )
      ) {
        document.getElementById(`${id}`).classList.add('wrongInput');
        document.getElementById(`${id}`).classList.remove('correctInput');
        this.updateState(
          `wrongMsg${name}`,
          'Please enter a valid E-mail address'
        );
      } else {
        document.getElementById(`${id}`).classList.add('correctInput');
        document.getElementById(`${id}`).classList.remove('wrongInput');
        this.updateState(`wrongMsg${name}`, '');
        this.updateState(name, value);
      }
    } else if (name === 'password') {
      if (
        !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        )
      ) {
        document.getElementById(`${id}`).classList.add('wrongInput');
        document.getElementById(`${id}`).classList.remove('correctInput');
        this.updateState(
          `wrongMsg${name}`,
          'Password must be more than 8 chars and have At least one upper case, one lower case, one number, one special character'
        );
      } else {
        document.getElementById(`${id}`).classList.add('correctInput');
        document.getElementById(`${id}`).classList.remove('wrongInput');
        this.updateState(`wrongMsg${name}`, '');
        this.updateState(name, value);
      }
    }else if (name === 'first_name' || name === 'last_name') {
      document.getElementById(`${id}`).classList.add('correctInput');
      document.getElementById(`${id}`).classList.remove('wrongInput');
      this.updateState(name, value);
      this.updateState(`wrongMsg${name}`, '');
    }
    if (value.length === 0) {
      document.getElementById(`${id}`).classList.add('wrongInput');
      document.getElementById(`${id}`).classList.remove('correctInput');
      this.updateState(`wrongMsg${name}`, 'Field is required');
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/login',
        state: {success: true}
      }} />
    }
    let error;
    if (this.state.error) {
      error = <Error>{this.state.error}</Error>;
    }
    return (
      <div className="suPage">
        <PopMn class="suPopMn">
          <img src={emailImg} alt="right" />
          <h2>Verify your E-mail address</h2>
          <p>
            Check you inbox now! you will be redirected automatically to login
            in
          </p>
          <p style={{ color: '#f0ba18', marginBottom: '1em' }}>
            <em>{`${this.state.timer}`}</em>
          </p>
        </PopMn>
        <div className="suContent">
          <div className="formBody">
            <div className="suImgPc">
              <div className="suCPc"></div>
              <img src={signupImg} alt="signup" className="suImgPc" />
            </div>
            <div className="suContForm">
              <h2>JOIN US</h2>
              <div className="errorBoxSu">{error}</div>
              <form method="POST" onSubmit={this.signup} className="signupForm">
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
                  <label htmlFor="E-mail">E-mail*</label>
                  <div>
                    <input
                      id="2"
                      onBlur={this.focusOut}
                      type="email"
                      placeholder="Enter E-mail Address"
                      name="email"
                    />
                    <i className="fas fa-envelope-open-text"></i>
                  </div>
                  <p>{this.state.wrongMsgemail}</p>
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
                    <i className="fas fa-key"></i>
                  </div>
                  <p>{this.state.wrongMsgpassword}</p>
                </div>
                <div className="formComp">
                  <label htmlFor="First Name">First Name*</label>
                  <div>
                    <input
                      onBlur={this.focusOut}
                      id="4"
                      placeholder="Enter First Name"
                      name="first_name"
                    />
                    <i className="fas fa-user-alt"></i>
                  </div>
                  <p>{this.state.wrongMsgfirst_name}</p>
                </div>
                <div className="formComp">
                  <label htmlFor="Last Name">Last Name*</label>
                  <div>
                    <input
                      onBlur={this.focusOut}
                      id="5"
                      placeholder="Enter Last Name"
                      name="last_name"
                    />
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <p>{this.state.wrongMsglast_name}</p>
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
                      JOIN US
                    </button>
                  )}
                </div>
              </form>
              <p className="haveAcc">
                Already have an Account?
                <Link
                  to={{
                    pathname: '/login',
                    state: { success: true },
                  }}
                >
                  Sign In
                </Link>
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
