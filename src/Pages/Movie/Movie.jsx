import React, { Component } from 'react';
import './Movie.css';
import imdb from '../../assets/imdb.png'
import Actor from '../../assets/actor.png'
import commentIcon from '../../assets/comments.svg'
import { Button, MovieCard, Header, Footer, SideBar, Loader, Error, WlLoading, Comment, PopMn} from '../../Components'
import axios from 'axios';
import { Redirect } from 'react-router-dom';


export default class Movie extends Component {
  state = {
    loading: true,
    movie: null,
    error: false,
    relatedMovies: <h2>No Related Found</h2>,
    btnText: 'Watchlist',
    btnLoading: false,
    popMnContent: '',
    redirect: false,
    commentBlock: false
  };

  goBack = () => {
    this.props.history.goBack();
  };

  getOneMovie = (e, movId) => {
    if (!movId) {
      movId = e;
    }
    this.setState({
      loading: true,
      relatedMovies: <Loader />,
    });
    axios
      .get(`${process.env.REACT_APP_API_DOMAIN}/movie/${movId}`, {
        headers: {
          Authorization: localStorage.getItem('mfToken'),
        },
      })
      .then((movie) => {
        if (!movie.data.fullplot && !movie.data.plot) {
          movie.data.fullplot = 'No Plot Provided';
        }
        axios
          .get(`${process.env.REACT_APP_API_DOMAIN}/movies/related`, {
            headers: {
              Genres: movie.data.genres,
              Authorization: localStorage.getItem('mfToken'),
            },
          })
          .then((movies) => {
            const relatedMovies = movies.data.map((movie) => {
              return (
                <div className="singleMovie">
                  <MovieCard
                    movie={movie}
                    key={movie._id}
                    click={this.getOneMovie}
                  />
                </div>
              );
            });
            this.setState({
              relatedMovies,
            });
          })
          .catch((err) => {
            this.setState({
              relatedMovies: <h2>No Related Found</h2>,
            });
          });
        this.setState({
          loading: false,
          movie: movie.data,
        });
      })
      .catch((err) => {
        this.setState({
          redirect: true,
        });
      });
  };

  getComments = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_DOMAIN}/getComments/${this.state.movie._id}`,
        {
          headers: {
            Authorization: localStorage.getItem('mfToken'),
          },
        }
      )
      .then((comments) => {
        const userId = comments.data.userId;
        const coms = comments.data.comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              userId={userId}
              getComments={this.getComments}
            />
          );
        });

        this.setState({
          commentBlock: true,
          popMnContent: <div>{coms}</div>,
        });
      })
      .catch((err) => {
        this.setState({
          redirect: true,
        });
      });
    document
      .getElementsByClassName('moviePop')[0]
      .classList.add('moviePopShow');
    this.setState({
      popMnContent: <WlLoading />,
    });
  };

  addToWatchlist = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/watchlist/${this.state.movie._id}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('mfToken'),
          },
        }
      )
      .then(() => {
        this.setState({
          btnText: 'Added',
          btnLoading: false,
        });
      })
      .catch(() => {
        this.setState({
          redirect: true,
        });
      });
    this.setState({
      btnLoading: true,
    });
    if (!localStorage.getItem('mfWl')) {
      localStorage.setItem('mfWl', this.state.movie._id + ',');
      return;
    }
    const oldV = localStorage.getItem('mfWl');
    localStorage.setItem('mfWl', oldV + this.state.movie._id + ',');
  };

  hidePlot = (fullplot) => { 
    document.getElementById('plot').textContent =
      fullplot.substring(0, 215) +
        ' ' +
        (
          <em
            style={{ color: '#f0ba18', cursor: 'pointer' }}
            onClick={this.showPlot.bind(this, fullplot)}
          >
            Show more
          </em>)
  };
  
  showPlot = (fullplot, e) => {
    if (window.innerWidth > 1024 && fullplot.length <= 1018) {
      document.getElementById('plot').textContent = fullplot
      return;
    }
    this.setState({
      popMnContent: (
        <div>
          <h2>Plot</h2>
          <p>{fullplot}</p>
        </div>
      ),
    });
    document
      .getElementsByClassName('moviePop')[0]
      .classList.add('moviePopShow');
  };

  componentDidMount() {
    if (localStorage.getItem('mfWl') && localStorage.getItem('mfWl').split(',').find((e) => e === this.props.match.params.id)) {
      this.setState({
        btnText: 'Added',
      });
    }
    this.getOneMovie(this.props.match.params.id);
  }

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
    if (!this.state.loading) {
      const movie = this.state.movie;
      const cast = this.state.movie.cast.map((actor) => {
        return (
          <div className="castActor">
            <img src={Actor} alt={actor} />
            <h4>{actor}</h4>
          </div>
        );
      });
      const genres = movie.genres.map((genre) => {
        return <li>{genre}</li>;
      });
      return (
        <div>
          <Header page={() => {}} />
          <PopMn
            res={true}
            movieId={this.state.movie._id}
            getComments={this.getComments}
            commentBlock={this.state.commentBlock}
          >
            {this.state.popMnContent}
          </PopMn>
          <div className="moviePage">
            <div className="movie">
              <div className="topIconsPcV">
                <i className="fas fa-arrow-circle-left mpGoB" onClick={this.goBack}></i>
                <i className="fas fa-comments commentIcon" onClick={this.getComments}></i>
              </div>
              {window.innerWidth <= 1024 ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="movieImg"
                />
              ) : null}
              <div className="moviePageSpace"></div>
              <div className="movieContent">
                <div>
                  <div className="imdb">
                    <a
                      href={`https://www.imdb.com/find?q=${movie.title.replace(
                        ' ',
                        '+'
                      )}`}
                    >
                      <i class="fab fa-imdb"></i>
                      <p>{movie.imdb ? movie.imdb['rating'] : '--'}/10</p>
                    </a>
                  </div>
                  <h1>{movie.title}</h1>
                </div>
                <div className="movieMeta">
                  <p>
                    {movie.countries ? movie.countries[0] : 'USA'}, {movie.year}
                    , {movie.runtime}min
                  </p>
                  <ul>{genres}</ul>
                </div>
                <div className="plot">
                  <p id="plot">
                    {movie.fullplot
                      ? movie.fullplot.substring(0, 215)
                      : movie.plot.substring(0, 215)}
                    ... <em style={{ color: '#f0ba18', cursor: 'pointer' }} onClick={this.showPlot.bind(
                      this,
                      movie.fullplot ? movie.fullplot : movie.plot
                    )}>Show more</em>
                  </p>
                </div>
                {this.state.btnLoading ? (
                  <WlLoading class="mWlLoading" />
                ) : (
                  <Button
                    class="movieBtn"
                    link={this.props.location.pathname}
                    click={
                      this.state.btnText === 'Watchlist'
                        ? this.addToWatchlist
                        : null
                    }
                  >
                    {this.state.btnText}
                  </Button>
                )}
              </div>
            </div>
            <div className="accessories">
              {window.innerWidth > 1024 ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="movieImgPcV"
                />
              ) : null}
              </div>
              <div className="cast">
                <h3>Cast</h3>
                <div className="castBlock">{cast}</div>
              </div>
              <div className="liked">
                <h3>Related Movies</h3>
                <div className="likedBlock">{this.state.relatedMovies}</div>
              </div>
          </div>
          <Footer class="movieFt" />
        </div>
      );
    } else {
      return (
        <div id="mvPage">
          <Header page={() => { }}/>
          <Loader />
          <Footer class="mvloFt" />
        </div>
      );
    }
  }
}

