import React, { Component } from 'react'
import './WlLoading.css';

export default class WlLoading extends Component {
  render() {
    return <div className={`lds-dual-ring ${this.props.class}`}></div>;
  }
}
