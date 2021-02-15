import React, { Component } from 'react'
import './Rating.css';

export default class Rating extends Component {

  state = {
    rated: true
  }
  
  componentDidMount() { 
    const rate = this.props.rating
    if (rate === '--') {
      this.setState({
        rated: false,
      });
    } else if (rate <= 2) {
      return;
    } else if (rate <= 4) {
      document.getElementById(`${this.props.id}r24`).classList.add('checked');
    } else if (rate <= 6) {
      document.getElementById(`${this.props.id}r24`).classList.add('checked');
      document.getElementById(`${this.props.id}r46`).classList.add('checked');
    } else if (rate <= 8) {
      document.getElementById(`${this.props.id}r24`).classList.add('checked');
      document.getElementById(`${this.props.id}r46`).classList.add('checked');
      document.getElementById(`${this.props.id}r68`).classList.add('checked');
    } else if (rate <= 9) {
      document.getElementById(`${this.props.id}r24`).classList.add('checked');
      document.getElementById(`${this.props.id}r46`).classList.add('checked');
      document.getElementById(`${this.props.id}r68`).classList.add('checked');
      document.getElementById(`${this.props.id}r89`).classList.add('checked');
    } else if (rate <= 10) {
      document.getElementById(`${this.props.id}r24`).classList.add('checked');
      document.getElementById(`${this.props.id}r46`).classList.add('checked');
      document.getElementById(`${this.props.id}r68`).classList.add('checked');
      document.getElementById(`${this.props.id}r89`).classList.add('checked');
      document.getElementById(`${this.props.id}r910`).classList.add('checked');
    }
  };
  
  render() {
    if (!this.state.rated) {
      return (
        <div></div>
      )
    }
    return (
      <div className={this.props.class}>
        <span id={`${this.props.id}r24`} className="fa fa-star star"></span>
        <span id={`${this.props.id}r46`} className="fa fa-star star"></span>
        <span id={`${this.props.id}r68`} className="fa fa-star star"></span>
        <span id={`${this.props.id}r89`} className="fa fa-star star"></span>
        <span id={`${this.props.id}r910`} className="fa fa-star star"></span>
      </div>
    );
  }
}
