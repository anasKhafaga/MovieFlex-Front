import React, { Component } from 'react'
import './Button.css'
import { Link } from 'react-router-dom';

export default class Button extends Component {
  render() {
    return (
      <Link
        to={this.props.link}
        className={`${this.props.class} btnLink`}
        onClick={this.props.click ? this.props.click : null}
      >
        <input
          type="submit"
          value={this.props.children}
          className={`btn ${this.props.click ? 'btnClicked' : ''}`}
        ></input>
      </Link>
    );
  }
}
