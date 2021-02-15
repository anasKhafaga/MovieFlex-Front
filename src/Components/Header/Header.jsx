import React, { Component } from 'react'
import './Header.css';
import menu from '../../assets/menu.svg'
import search from '../../assets/search.svg'
import close from '../../assets/error.svg'
import Input from '../Input/Input';
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default class Header extends Component {
  state = {
    menuHiden: '',
    animate: '',
    mhSearchBox: '',
  };

  logout = (e) => {
    localStorage.removeItem('mfToken');
    localStorage.removeItem('mfWl');
  };

  showMenu = (e) => {
    if (!this.state.menuHiden) {
      this.setState({
        menuHiden: 'sBarShow',
        animate: 'sbPopAnimate',
      });
    } else {
      this.setState({
        menuHiden: '',
        animate: 'sbPopAnimateOut',
      });
    }
  };

  showSearch = (status, e) => {
    if (!status) {
      this.props.cancelSearch();
      this.props.getMovies();
    }
    if (!this.state.mhSearchBox && window.innerWidth < 1025) {
      this.setState({
        mhSearchBox: 'mhSearchBox',
      });
    } else {
      this.setState({
        mhSearchBox: '',
      });
    }
  };

  render() {
    const authenticated = [
      <li>
        <Link
          to={{
            pathname: '/login',
            state: { success: true },
          }}
        >
          LOG IN
        </Link>
      </li>,
      <li>
        <Link to="/signup">JOIN US</Link>
      </li>,
    ];
    let show = null;
    if (window.innerHeight > 551 && window.innerWidth > 1025) {
      show = (
        <ul className="mainNav">
          <li>
            <Link to="/">Home Page</Link>
          </li>|
          <li>
            <Link to="/browse/1">Browse</Link>
          </li>
          <li>
            <Link
              to="/top-rated"
              onClick={() => {
                this.props.page();
              }}
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              to="/popular"
              onClick={() => {
                this.props.page();
              }}
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              to="/watchlist"
              onClick={() => {
                this.props.page();
              }}
            >
              My Watchlist
            </Link>
          </li>|
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
            authenticated
          )}
        </ul>
      );
    }
    return (
      <div className="mainHeader">
        <div className="mhContent">
          <div className="mnDiv">
            <img src={menu} className="mhMenu" onClick={this.showMenu} />
          </div>
          <div className="headerDiv">
            <Link to="/">
              <h1>MovieFlex</h1>
            </Link>
          </div>
          {show}
          <div className="seDiv">
            {this.props.search
              ? [
                  !this.props.searchStatus ? (
                    <img
                      src={search}
                      className="mhSearch"
                      onClick={this.showSearch.bind(this)}
                    />
                  ) : (
                    <img
                      src={close}
                      className="mhSearch mhClose"
                      onClick={this.showSearch.bind(this, false)}
                    />
                  ),
                  <Input
                    class={this.state.mhSearchBox}
                    searchBx={this.props.searchBx}
                  />,
                ]
              : null}
          </div>
        </div>
        <SideBar
          class={this.state.menuHiden}
          classAnimate={this.state.animate}
          showMenu={this.showMenu}
          page={this.props.page}
          authenticated={authenticated}
        />
      </div>
    );
  }
}
