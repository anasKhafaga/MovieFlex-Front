import React, { Component } from 'react'
import './Pagination.css';
import { Link } from 'react-router-dom';

export default class Pagination extends Component {
  render() {
    let prevPage, nextPgae;
    if (this.props.currentPage !== 1) {
      prevPage = (
        <Link
          to={`/browse/${this.props.currentPage - 1}`}
          className="pagMove"
        >
          <i className="fas fa-arrow-circle-left"></i>
        </Link>
      )
    }
    if (this.props.currentPage !== this.props.pagesNo) {
      nextPgae = (
        <Link
          to={`/browse/${this.props.currentPage + 1}`}
          className="pagMove"
        >
          <i className="fas fa-arrow-circle-right"></i>
        </Link>
      );
    }
    return (
      <div className="pagBar">
        {prevPage}
        <Link to={`/browse/${1}`} className="pagItem">
          1
        </Link>
        <p className="pagItem">
          ...
        </p>
        <Link
          to={`/browse/${this.props.currentPage}`}
          className="pagItem pageItemA"
        >
          {this.props.currentPage}
        </Link>
        <p className="pagItem">
          ...
        </p>
        <Link to={`/browse/${this.props.pagesNo}`} className="pagItem">
          {this.props.pagesNo}
        </Link>
        {nextPgae}
      </div>
    );
  }
}