import React, { Component } from 'react';
import './SpMovieCard.css';
import crown from '../../assets/crown.svg';
import watchLater from '../../assets/watchLater.svg';
import globalIcon from '../../assets/global.svg';
import delIcon from '../../assets/error.svg';
import Rating from '../Rating/Rating';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

export default class SpMovieCard extends Component {
  state = {
    deletedTog: false,
    loading: false,
    deleted: false,
    wLater: false,
    redirect: false,
  };

  wLaterFun = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/watchlist/${this.props.movie._id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('mfToken'),
          },
        }
      )
      .then(() => {})
      .catch(() => {
        this.setState({
          redirect: true,
        });
      });
      this.setState({
        wLater: true,
      });
      if (!localStorage.getItem('mfWl')) {
        localStorage.setItem('mfWl', this.props.movieId + ',');
        return;
      }
      const oldV = localStorage.getItem('mfWl');
      localStorage.setItem('mfWl', oldV + this.props.movieId + ',');
  };

  deleteMove = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_DOMAIN}/watchlist/${this.props.movieId}`,
        {
          headers: {
            Authorization: localStorage.getItem('mfToken'),
          },
        }
      )
      .then(() => {
        this.setState({
          deletedTog: !this.state.deletedTog,
          loading: false,
        });
        
        
      })
      .catch((err) => {
        alert(err);
      });
      this.setState({
        loading: true,
        deleted: true,
      });
      if (!localStorage.getItem('mfWl')) {
        return;
      }
    const oldV = localStorage.getItem('mfWl');
    const oldVE = oldV.replace(`${this.props.movieId},`, '');
    localStorage.setItem('mfWl', oldVE);

  };

  
  componentDidMount() { 
    if (localStorage.getItem('mfWl') && localStorage.getItem('mfWl').split(',').find((e) => e === this.props.movie._id)) {
      this.setState({
        wLater: true,
      });
    }
  };
  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { error: true },
          }}
        />
      );
    }
    const movie = this.props.movie;
    if (this.state.deleted) {
      document.getElementById(this.props.movieId).classList.add('smcRemove');
    }
    let wLater;
    if (!this.state.wLater) {
      wLater = <img src={watchLater} alt="smcIcon" className="wLIcon" onClick={this.wLaterFun} />;
    } else {
      wLater = (
        <span className="wlAdded" style = {{fontSize: "1.1em", color: "white"}}>
          <i className="fas fa-check-circle"></i>
        </span>
      );
    }
    let show;
    if (this.props.path === '/watchlist') {
      show = (
        <img
          src={delIcon}
          alt="smcIcon"
          className="smcIcon globalIcon"
          onClick={this.deleteMove}
        />
      );
    } else if (this.props.path === '/top-rated') {
      show = (
        <div className="smcIcons">
          {wLater}
        </div>
      );
    } else if (this.props.path === '/popular') {
      show = (
        <div className="smcIcons">
          {wLater}
        </div>
      );
    }
    return (
      <div id={this.props.movieId} className={`spMvCrd ${this.props.class}`}>
        <Link to={`/movie/${this.props.movieId}`}>
          <img src={movie.poster} alt={movie.title} className="smcPoster" />
        </Link>
        {show}
        <Link to={`/movie/${this.props.movieId}`}>
          <div className="sMCContent">
            <Rating
              rating={movie.imdb ? movie.imdb['rating'] : '--'}
              id={movie._id}
              class="spMCrating"
            />
            <h5>{movie.title}</h5>
            <div className="genreBox">
              <p>{movie.genres ? movie.genres[0] : 'Not Specified'}</p>
            </div>
            <div className="spMeta">
              <p>{movie.countries ? movie.countries[0] : 'USA'}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}
