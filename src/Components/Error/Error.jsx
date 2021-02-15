import React, { Component } from 'react'
import errorIcon from '../../assets/error.svg';
import './Error.css';

export default class Error extends Component {
  render() {
    return (
      <div className={`errorBox ${this.props.class}`}>
        <img src={errorIcon} alt="error" />
        <p>
        {this.props.children}
        </p>
      </div>
    )
  }
}
