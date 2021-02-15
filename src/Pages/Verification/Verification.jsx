import axios from 'axios';
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import congratsImg from '../../assets/congrats.svg';
import { PopMn} from '../../Components'
import './Verification.css'

export default class Verification extends Component {
  state = {
    timer: 5,
    redirect: false
  };

  componentDidMount() {
    console.log(this.props.match.params.token);
    axios.get(`${process.env.REACT_APP_API_DOMAIN}/auth/verify?token=${this.props.match.params.token}`)
      .then(() => { 
        localStorage.setItem('mfToken', `Bearer ${this.props.match.params.token}`);
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
            redirect: true,
          });
        }, 5000);
      })
      .catch(err => {
        this.setState({
        redirect: true
      })
    })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/',
        state: {error: true}
      }}/>
    }
    return (
      <div>
        <PopMn class="suPopMn">
          <img src={congratsImg} alt="right" />
          <h2>Congratulations!</h2>
          <p>
            Now, you are a member of movieFlex community, hope you enjoy with us!
          </p>
          <p style={{ color: '#f0ba18', marginBottom: '1em' }}>
            <em>{`${this.state.timer}`}</em>
          </p>
        </PopMn>
      </div>
    );
  }
}
