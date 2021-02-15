import React, { Component } from 'react';
import { Header, MovieCard, Pagination, Footer, Loader, Error } from '../../Components';
import './Browse.css'
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export default class Browse extends Component {
  state = {
    movies: [],
    pagesNo: 0,
    show: null,
    loading: true,
    searching: false,
    error: false
  };

  getMovies = () => {
    if (isNaN(parseInt(this.props.match.params.page))) {
      return;
    }
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/movies/browse/${parseInt(
          this.props.match.params.page
        )}`
      )
      .then((movies) => {
        const movieArr = [...movies.data.movies];
        const pages = movies.data.pgNo;
        this.setState({
          movies: movieArr,
          pagesNo: pages,
          loading: false,
        });
      })
      .catch((err) => {
        alert(err);
      });
  };

  search = (value, e) => {
    if (e.keyCode !== 13) {
      return;
    }
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/movies/search/${value}`, {
        headers: {
          Authorization: localStorage.getItem('mfToken')
        }
      })
      .then((movies) => {
        this.setState({
          movies: movies.data,
          loading: false
        });
      })
      .catch((err)=>{
        this.setState({
          error: true
        })
      });
    this.setState({
      loading: true,
      searching: true,
    });
  };

  cancelSearch = () => { 
    this.setState({
      searching: false,
      loading: true
    })
  };
  
  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.page !== this.props.match.params.page) {
      this.getMovies();
      this.setState({
        loading: true,
      });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <Redirect to={{
          pathname: '/login',
          state: {error: true}
        }}/>
      )
    }
    let movies;
    let show;
    if (isNaN(parseInt(this.props.match.params.page))) {
      return (
        <div className="explorePage">
          <Header />
          <div className="exMain">
            <Error>Oops! something went wrong</Error>
          </div>
          <Footer class="brFt brFtEr" />
        </div>
      );
    }
    if (this.state.loading) {
      show = <Loader />;
    } else {
      movies = this.state.movies.map((movie) => {
        return <MovieCard movie={movie} key={movie._id} />;
      });

      show = (
        <div className="exMain">
          <div className="exploreContent" style={this.state.searching? {marginBottom: "2em", marginTop: "2.2em"}: null}>{movies}</div>
          {this.state.searching ? null :
            <div className="paginationBar">
              <Pagination
                pagesNo={this.state.pagesNo}
                currentPage={parseInt(this.props.match.params.page)}
              />
            </div>}
        </div>
      );
    }

    return (
      <div className="explorePage">
        <Header page={() => { }} search={true} searchBx={this.search} searchStatus={this.state.searching} cancelSearch={this.cancelSearch} getMovies={ this.getMovies}/>
        {show}
        <Footer
          class={this.state.loading || this.state.searching ? 'brLoFt' : 'brFt'}
        />
      </div>
    );
  }
}
