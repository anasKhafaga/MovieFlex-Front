import axios from 'axios';
import React, { Component } from 'react'
import HumanAvatar from '../../assets/humanAvatar.jpg';
import WlLoading from '../WlLoading/WlLoading';
import './Comment.css';
import dateFormat from 'dateformat';


export default class Comment extends Component {
  state = {
    comment: '',
    loading: false,
    edit: this.props.leave,
    editText: '',
    close: false,
  };

  taChange = (e) => {
    this.setState({
      editText: e.target.value,
    });
  };

  updateState = (e) => {
    const { value } = e.target;
    this.setState({
      comment: value,
    });
  };

  editCom = () => {
    const text = document.getElementById('comText').textContent;
    this.setState({
      edit: true,
      close: true,
      editText: text,
    });
  };

  closeEditing = () => {
    this.setState({
      edit: false,
      close: false,
      editText: '',
    });
  };

  deleteCom = () => {
    console.log('object')
        axios
          .delete(
            `${process.env.REACT_APP_API_DOMAIN}/deleteComment/${this.props.comment._id}`,
            {
              headers: {
                Authorization: localStorage.getItem('mfToken'),
              },
            }
          )
          .then(() => {
            this.setState({
              loading: false,
            });
            this.props.getComments();
          })
          .catch((err) => {
            alert('Oops! Something went wrong');
          });
        this.setState({
          loading: true,
        });
  };

  edit = () => {
    if (!this.state.editText) {
      return;
    }
    axios
      .put(
        `${process.env.REACT_APP_API_DOMAIN}/editComment/${this.props.comment._id}`,
        {
          text: this.state.editText,
        },
        {
          headers: {
            Authorization: localStorage.getItem('mfToken'),
          },
        }
      )
      .then(() => {
        this.setState({
          loading: false,
        });
        this.props.getComments();
      })
      .catch((err) => {
        alert('Oops! Something went wrong');
      });
    this.setState({
      loading: true,
    });
  };

  post = () => {
    if (!this.state.comment) {
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_API_DOMAIN}/createComment/${this.props.movieId}`,
        {
          text: this.state.comment,
        },
        {
          headers: {
            Authorization: localStorage.getItem('mfToken'),
          },
        }
      )
      .then(() => {
        this.setState({
          loading: false,
          editText: ''
        });
        this.props.getComments();
      })
      .catch((err) => {
        alert('Oops! Something went wrong');
      });
    this.setState({
      loading: true,
    });
  };

  render() {
    let leave = this.props.leave;
    if (!leave) {
      leave = true;
    }
    const comment = this.props.comment;
    return (
      <div className="comment">
        <div className="comBlock">
          <img src={HumanAvatar} alt="humanAvatar" />
          {!leave || !this.state.edit ? (
            [
              <div className="comData">
                <h4>{comment.name}</h4>
                <p className="comMeta">
                  {dateFormat(comment.date, 'dd mmm yyyy | hh:MM TT')}
                </p>
                <p id="comText">{comment.text}</p>
              </div>,
              comment.userId === this.props.userId ? (
                <div className="comTools">
                  {this.state.loading ? <WlLoading class="comLoading" /> :
                  ([<i class="fas fa-pencil-alt" onClick={this.editCom}></i>,
                    <i class="fas fa-trash t" onDoubleClickCapture={this.deleteCom}></i>])}
                </div>
              ) : null,
            ]
          ) : (
            <div className="leaveCom">
              <textarea
                placeholder="Leave a comment"
                onBlur={this.updateState}
                id="comment"
                value={this.state.editText}
                onChange={this.taChange}
              ></textarea>
              {!this.state.loading ? (
                <div className="comBtns">
                  {this.state.close ? (
                    <i
                      className="fas fa-times-circle t c"
                      onClick={this.closeEditing}
                    ></i>
                  ) : null}
                  <button
                    className="btn"
                    onClick={this.props.leave ? this.post : this.edit}
                  >
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              ) : (
                <WlLoading class="comLoading" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}
