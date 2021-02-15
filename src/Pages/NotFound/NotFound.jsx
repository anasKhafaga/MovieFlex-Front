import React, { Component } from 'react';
import { Header, Footer } from '../../Components';
import notFoundImg from '../../assets/error-404.svg';
import './NotFound.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className="nFPage">
        <Header />
        <div className="notFound">
          <img src={notFoundImg} alt="notFound" />
          <h2>Page Not Found</h2>
        </div>
        <Footer class="nfFt" />
      </div>
    );
  }
}
