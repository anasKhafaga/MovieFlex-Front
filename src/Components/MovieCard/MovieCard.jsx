import React, { Component } from 'react'
import WatchLater from '../../assets/watchLater.svg'
import { Link, Redirect } from 'react-router-dom';
import './MovieCard.css';
import Rating from '../Rating/Rating'
import WlLoading from '../WlLoading/WlLoading'
import axios from 'axios';

export default class MovieCard extends Component {

  state = {
    wlLoading: false,
    added: false,
    redirect: false
  }

  addToWatchlist = () => { 
    // Change user id to dynamic value
    axios.post(`${process.env.REACT_APP_API_DOMAIN}/watchlist/${this.props.movie._id}`, {}, {
      headers: {
      Authorization: localStorage.getItem("mfToken")
    }})
      .then(() => {
        this.setState({
          wlLoading: false,
          added: true
        })
      })
      .catch(() => {
        this.setState({
          redirect: true
        })
      });
      this.setState({
        wlLoading: true
      })
      if (!localStorage.getItem('mfWl')) {
        localStorage.setItem('mfWl', this.props.movie._id + ',');
        return;
      }
      const oldV = localStorage.getItem('mfWl');
      localStorage.setItem('mfWl', oldV + this.props.movie._id + ',');
  };

  componentDidMount() { 
    if (localStorage.getItem('mfWl') && localStorage.getItem('mfWl').split(',').find((e) => e === this.props.movie._id)) {
      this.setState({
        added: true,
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
    let genre = 'Not Specified';
    let wlState = <img src={WatchLater} alt="add" onClick={this.addToWatchlist} />;
    if (this.props.movie.genres && this.props.movie.genres.length > 0) {
      genre = this.props.movie.genres[0];
    }
    if (this.state.wlLoading) {
      wlState = <WlLoading />
    }
    if (this.state.added) {
      wlState = (
        <span className="wlAdded" style={{color: "white"}}>
          <i className="fas fa-check-circle"></i>
        </span>
      );
    }
    return (
      <div className="mCard">
        <div className="mvcdIcon">{wlState}</div>

        <Link to={`/movie/${this.props.movie._id}`}>
          <div className="mcardContent" onClick={(e)=> this.props.click? this.props.click(e, this.props.movie._id) : null}>
            <div className="mcardSpace"></div>
            <Rating
              rating={
                this.props.movie.imdb ? this.props.movie.imdb['rating'] : '--'
              }
              id={this.props.movie._id}
            />
            <h5>{this.props.movie.title}</h5>
            <div className="genreBox">
              <p>{genre}</p>
            </div>
          </div>
          <div className="mcardCover">
            <div className="mcardCoverShadow"></div>
            <img
              src={this.props.movie.poster}
              alt={this.props.movie.title}
              className="mCardImg"
            />
          </div>
        </Link>
      </div>
    );
  }
}
