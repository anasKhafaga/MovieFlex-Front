import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className={`mainFooter ${this.props.class}`}>
        <div className="mfContent">
          <p>©2018-2021 | Anas Khafaga</p>
          <ul className="socialMedia">
            <li>
              <a
                href="https://twitter.com/KhafagaAnas"
                className="smedia fa fa-twitter"
              ></a>
            </li>
            <li>
              <a
                href="http://www.facebook.com/anos.khafaga/"
                className="smedia fa fa-facebook"
              ></a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/anaskhafaga/"
                className="smedia fa fa-linkedin"
              ></a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
