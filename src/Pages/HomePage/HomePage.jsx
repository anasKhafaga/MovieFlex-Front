import React, { Component } from 'react'
import { Footer, Button } from '../../Components'
import slideIcon from '../../assets/slide.svg';
import './HomePage.css'
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  state = {
    pageAim: 'Browse All Movies',
    link: '/browse/1',
    titleShown: false,
    pgIcon: <i className="fab fa-wpexplorer exIcon"></i>,
  };

  titleSlideIn = (e) => {
    document.getElementById('hpTit').classList.add('hpTitleAnim');
    document.getElementById('hpTit').classList.toggle('hpTitleShow');
    document.getElementById('hpSCvr').classList.toggle('slideCoverHide');
  };

  addClass = (eleA, ele1, ele2, ele3) => {
    document.getElementById(eleA).classList.add('hpNavA');
    document.getElementById(ele1).classList.remove('hpNavA');
    document.getElementById(ele2).classList.remove('hpNavA');
    document.getElementById(ele3).classList.remove('hpNavA');
  };

  scrollbarChange = (e, dire, eles) => {
    let direction, size, resetHor;
    if (dire === 'Hor') {
      direction = e.target.scrollLeft;
      size = window.screen.width;
      resetHor = () => {};
    } else {
      direction = e.target.scrollTop;
      size = window.screen.height;
      resetHor = (section1, section2, text, link, pgIcon) => {
        this.addClass('hor-1', 'hor-2', 'hor-3', 'hor-4');
        document.getElementById(section1).scrollTo({ left: 0 });
        document.getElementById(section2).scrollTo({ left: 0 });
        this.setState({
          pageAim: text,
          pgIcon,
          link,
        });
      };
    }
    if (direction < 0.5 * size) {
      this.addClass(eles[0], eles[1], eles[2], eles[3]);
      resetHor(
        'sectionB',
        'sectionC',
        'Browse All Movies',
        '/browse/1',
        <i class="fab fa-wpexplorer exIcon"></i>
      );
    } else if (direction >= 0.5 * size && direction < 1.5 * size) {
      this.addClass(eles[1], eles[0], eles[2], eles[3]);
      resetHor(
        'sectionA',
        'sectionC',
        'Browse Top Rated Movies',
        '/top-rated',
        <i className="fas fa-crown"></i>
      );
    } else if (direction >= 1.5 * size && direction < 2.5 * size) {
      this.addClass(eles[2], eles[0], eles[1], eles[3]);
      resetHor(
        'sectionB',
        'sectionA',
        'Browse Most Popular Movies',
        '/popular',
        <i class="fas fa-globe-europe exIcon"></i>
      );
    } else if (direction < size * 3) {
      this.addClass(eles[3], eles[0], eles[1], eles[2]);
    }
  };

  render() {
    return (
      <div className="hpPage">
        {window.innerWidth < 1025 ?
          <div
            className="hpPageContent"
            onScroll={(e) =>
              this.scrollbarChange(e, 'Ver', ['ver-1', 'ver-2', 'ver-3', 'ver-4'])
            }
          >
            <div className="hpNav">
              <div id="hor-1" className="hpNavA"></div>
              <div id="hor-2"></div>
              <div id="hor-3"></div>
              <div id="hor-4"></div>
            </div>
            <div className="hpNavVer">
              <div id="ver-1" className="hpNavA"></div>
              <div id="ver-2"></div>
              <div id="ver-3"></div>
              <div id="ver-4" hidden></div>
            </div>
            <div className="hpContentPack">
              <div className="hpContent">
                <div className="hpTitle" id="hpTit">
                  <h1>MovieFlex</h1>
                  <p>{this.state.pageAim}</p>
                  <Button class="hpTitleBtn" link={this.state.link}>
                    Browse
                </Button>
                </div>
                <div className="titleSlideIn hpIcon">{this.state.pgIcon}</div>
                <div className="titleSlideIn">
                  <i className="fas fa-bars" onClick={this.titleSlideIn}></i>
                </div>
              </div>
              <div
                id="hpSCvr"
                className="slideCover slideCoverHide"
                onClick={this.titleSlideIn}
              ></div>
            </div>
            <div className="hpSection">
              <div
                id="sectionA"
                className="hpFaceBack"
                onScroll={(e) =>
                  this.scrollbarChange(e, 'Hor', [
                    'hor-1',
                    'hor-2',
                    'hor-3',
                    'hor-4',
                  ])
                }
              >
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMjE3NzI2MzYwOF5BMl5BanBnXkFtZTcwMjc1MDQ4NA@@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMjM2NTQ5Mzc2M15BMl5BanBnXkFtZTgwNTcxMDI2NTE@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNzQ3OTY4NjAtNzM5OS00N2ZhLWJlOWUtYzYwZjNmOWRiMzcyXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTUyNDIyMTA4NV5BMl5BanBnXkFtZTgwODM2MDMxNjE@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="hpSection">
              <div
                id="sectionB"
                className="hpFaceBack"
                onScroll={(e) =>
                  this.scrollbarChange(e, 'Hor', [
                    'hor-1',
                    'hor-2',
                    'hor-3',
                    'hor-4',
                  ])
                }
              >
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNzA5ZDNlZWMtM2NhNS00NDJjLTk4NDItYTRmY2EwMWZlMTY3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
              </div>
            </div>
            <div className="hpSection">
              <div
                id="sectionC"
                className="hpFaceBack"
                onScroll={(e) =>
                  this.scrollbarChange(e, 'Hor', [
                    'hor-1',
                    'hor-2',
                    'hor-3',
                    'hor-4',
                  ])
                }
              >
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMzkzMmU0YTYtOWM3My00YzBmLWI0YzctOGYyNTkwMWE5MTJkXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
                <img
                  src="https://m.media-amazon.com/images/M/MV5BNDUyODAzNDI1Nl5BMl5BanBnXkFtZTcwMDA2NDAzMw@@._V1_SY1000_SX677_AL_.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
          : <div className="pcView">
            <div className="hpTitleP">
              <h1>movieFlex</h1>
            </div>
              <div className="posterLtP pos">
            <Link to={{ pathname: '/top-rated', state: { success: true } }}>
              <div className="posterP">
                <div className="posterBP">
                  <div className="posterCP"></div>
                  <img
                    className="posterP"
                    src="https://m.media-amazon.com/images/M/MV5BMjE3NzI2MzYwOF5BMl5BanBnXkFtZTcwMjc1MDQ4NA@@._V1_SY1000_SX677_AL_.jpg"
                    alt="movie"
                  />
                </div>
              </div>
              <div className="trT secTitles">
                <div>
                  <h2>Top Rated</h2>
                </div>
                <div>
                  <i className="fas fa-crown"></i>
                </div>
              </div>
            </Link>
              </div>
              <div className="posterRP pos">
            <Link to={{ pathname: '/popular', state: { success: true } }}>
              <div className=" posterP">
                <div className="posterBP">
                  <div className="posterCP"></div>
                  <img
                    className="posterP"
                    src="https://m.media-amazon.com/images/M/MV5BMjE3NzI2MzYwOF5BMl5BanBnXkFtZTcwMjc1MDQ4NA@@._V1_SY1000_SX677_AL_.jpg"
                    alt="movie"
                  />
                </div>
              </div>
              <div className="mpT secTitles">
                <div>
                  <h2>Most Popular</h2>
                </div>
                <div className="">
                  <i class="fas fa-globe-europe exIcon"></i>
                </div>
              </div>
            </Link>
            </div>
              <div className="posterMdP pos">
            <Link to={{ pathname: '/browse/1', state: { success: true } }}>
              <div className=" posterP">
                <div className="posterBP">
                  <div className="posterCP"></div>
                  <img
                    className="posterP"
                    src="https://m.media-amazon.com/images/M/MV5BMjE3NzI2MzYwOF5BMl5BanBnXkFtZTcwMjc1MDQ4NA@@._V1_SY1000_SX677_AL_.jpg"
                    alt="movie"
                  />
                </div>
              </div>
              <div className="baT secTitles">
                <div>
                  <h2>Browse All</h2>
                </div>
                <div className="">
                  <i className="fab fa-wpexplorer exIcon"></i>
                </div>
              </div>
            </Link>
            </div>
            <div className="hpBackImgPC"></div>
          </div>}
      </div>
    );
  }
}
