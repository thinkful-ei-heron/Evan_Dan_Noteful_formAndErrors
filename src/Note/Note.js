import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';

export default class Note extends Component {
  static contextType = NoteContext;

  static propTypes = {
    date: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    description: PropTypes.string
  };

  render() {
    const deleteNote = this.context.deleteNote;
    return (
      <>
        <li className="note">
          <Link to={'/note/' + this.props.id}>
            <div className="noteCard">
              <h2>{this.props.name}</h2>
              <div className="noteInfo">
                <span>{this.props.date}</span>
                <Link to="/">
                  <button onClick={e => deleteNote(this.props.id)}>Delete Note</button>
                </Link>
              </div>
            </div>
          </Link>
        </li>
        {this.props.description ? (
          <li>
            <p>{this.props.description}</p>
          </li>
        ) : (
          ''
        )}
      </>
    );
  }
}
