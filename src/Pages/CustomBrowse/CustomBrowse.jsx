import React, { Component } from 'react'
import './CustomBrowse.css'
import { Header, SpMovieCard, Pagination, Footer, SideBar, Loader } from '../../Components';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class CustomBrowse extends Component {
  state = {
    loading: false,
    show: '',
    redirect: false,
    pageTitle: '',
    pageChanged: false,
  };

  updatePC = (hide) => { 
    this.setState({
      pageChanged: !this.state.pageChanged
    })
    if (!hide) {
      return;
    }
    hide();
  };
  
  getWatchlistMovies = () => {
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/watchlist`, {
        headers: {
          Authorization: localStorage.getItem('mfToken'),
        },
      })
      .then((movies) => {
        if (movies.data.movies.length === 0) {
          return this.setState({
            loading: false,
            show: <h3 style={{width: "95vw", fontFamily: "Righteous", letterSpacing: "0.2em", textAlign: 'center'}}>No Movies In Your Watchlist</h3>,
          });
        }
        const showMovies = movies.data.movies.map((movie) => {
          return (
            <SpMovieCard
              movie={movie}
              movieId={movie.movieId}
              class="spMC"
              path={this.props.match.path}
            />
          );
        });
        this.setState({
          loading: false,
          show: showMovies,
        });
      })
      .catch((err) => {
        this.setState({
          redirect: true,
        });
      });

    this.setState({ loading: true });
  };

  getTopRated = () => { 
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/movies/top-rated`, {
        headers: {
          Authorization: localStorage.getItem('mfToken'),
        },
      })
      .then((movies) => {
        const showMovies = movies.data.movies.map((movie) => {
          return (
            <SpMovieCard
              movie={movie}
              movieId={movie._id}
              class="spMC"
              path={this.props.match.path}
              watchlist={movies.data.watchlist}
            />
          );
        });
        this.setState({
          loading: false,
          show: showMovies,
        });
      })
      .catch((err) => {
        this.setState({
          redirect: true,
        });
      });
    this.setState({ loading: true });
  };

  getMostPopular = () => { 
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/movies/popular`, {
        headers: {
          Authorization: localStorage.getItem('mfToken')
        }
      })
      .then((movies) => {
        const showMovies = movies.data.map((movie) => {
          return (
            <SpMovieCard
              movie={movie}
              movieId={movie._id}
              class="spMC"
              path={this.props.match.path}
            />
          );
        });
        this.setState({
          loading: false,
          show: showMovies,
        });
      })
      .catch((err) => {
        this.setState({
          redirect: true,
        });
      });
    this.setState({ loading: true });
  };

  fetchMovies = () => { 
    if (!localStorage.getItem('mfToken')) {
      this.setState({
        redirect: true,
      });
    }
    if (this.props.match.path === '/watchlist') {
      this.setState({
        pageTitle: `My Watchlist`,
      });
      this.getWatchlistMovies();
    } else if (this.props.match.path === '/top-rated') {
      this.setState({
        pageTitle: `Top Rated`,
        pgIcon: <i className="fas fa-crown globeIteration"></i>,
      });
      this.getTopRated();
    } else if (this.props.match.path === '/popular') {
      this.setState({
        pageTitle: `Most Popular`,
        pgIcon: <i className="fas fa-globe-europe globeIteration"></i>,
      });
      this.getMostPopular();
    }
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.pageChanged !== prevState.pageChanged) {
      this.fetchMovies();
    }
  }
  
  componentDidMount() {
    this.fetchMovies();
  }
  
  render() {
    if (this.state.redirect) {
      return <Redirect to={{
        pathname: '/login',
        state: {error: true}
      }} />
    }
    let show;
    if (this.state.loading) {
      show = <Loader class="cbLoader" />;
    } else {
      show = this.state.show;
    }
    return (
      <div className="cbPage">
        <Header page={ this.updatePC}/>
        <div className="exMain">
          <h2>{this.state.pgIcon} {this.state.pageTitle}</h2>
          <div className="cbContent">{show}</div>
        </div>
        <Footer class={ this.state.loading? 'cbFtWl' : (this.props.match.path === '/watchlist'? "cbFtWl": "cbFt")} />
      </div>
    );
  }
}
