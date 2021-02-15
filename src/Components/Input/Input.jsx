import React, { Component } from 'react'
import './Input.css';

export default class input extends Component {

  state = {
    value: ''
  }
  change = (e) => { 
    this.setState({
      value: e.target.value
    })
  };
  render() {
    return (
      <div className={`input ${this.props.class}`}>
        <input
          id="seIn"
          placeholder="Search"
          onChange={this.change}
          onKeyDown={ this.props.searchBx.bind(this, this.state.value)}
        ></input>
        <div className="divFocus"></div>
      </div>
    );
  }
}
