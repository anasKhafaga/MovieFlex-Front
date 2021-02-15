import React, { Component } from 'react'
import Close from '../../assets/error.svg';
import './PopMn.css';
import Comment from '../Comment/Comment'


export default class PopMn extends Component {

  closeMPop = () => {
    document
      .getElementsByClassName('moviePop')[0]
      .classList.remove('moviePopShow');
  };

  render() {
    return (
      <div className={`moviePop`}>
        {this.props.res ? (
          <img
            src={Close}
            alt="close"
            onClick={this.closeMPop}
            class="mpdIcon"
          />
        ) : null}
        <div className={`popMn ${this.props.class}`}>
          {[
            this.props.commentBlock?
            <Comment
              leave={true}
              movieId={this.props.movieId}
              getComments={this.props.getComments}
            />: null,
            this.props.children,
          ]}
        </div>
        <div
          className="popCvr"
          onClick={this.props.res ? this.closeMPop : null}
        ></div>
      </div>
    );
  }
}
