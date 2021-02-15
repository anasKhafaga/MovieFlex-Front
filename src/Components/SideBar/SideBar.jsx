import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

export default class SideBar extends Component {

  hide = (e) => { 
    this.props.showMenu();
  };

  logout = (e) => { 
    localStorage.removeItem('mfToken');
    localStorage.removeItem('mfWl');
  };
  
  render() {
    let page;
    if (this.props.page) {
      page = this.props.page;
    } else {
      page = () => { };
    }
    return (
      <div className={`sBar ${this.props.class}`}>
        <div className={`sbPop ${this.props.classAnimate}`}>
          <div>
            <h5>Menu</h5>
            <ul>
              <li>
                <Link to="/">Home Page</Link>
              </li>
              <li>
                <Link to="/browse/1">Browse</Link>
              </li>
              <li>
                <Link to="/top-rated" onClick={()=>{page(this.hide)}}>
                  Top Rated
                </Link>
              </li>
              <li>
                <Link to="/popular" onClick={()=>{page(this.hide)}}>
                  Popular
                </Link>
              </li>
              <li>
                <Link to="/watchlist" onClick={()=>{page(this.hide)}}>
                  My Watchlist
                </Link>
              </li>
              {localStorage.getItem('mfToken') ? (
                <li>
                  <Link
                    to={{
                      pathname: '/login',
                      state: { success: true },
                    }}
                    onClick={this.logout}
                  >
                    LOG OUT
                  </Link>
                </li>
              ) : (
                this.props.authenticated
              )}
            </ul>
          </div>
        </div>
        <div className="sbCover" onClick={this.hide}></div>
      </div>
    );
  }
}
