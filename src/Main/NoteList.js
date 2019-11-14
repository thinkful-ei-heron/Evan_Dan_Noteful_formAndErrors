import React, { Component } from 'react';
import Note from '../Note/Note';
import './NoteList.css';
import NoteContext from '../NoteContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class NoteList extends Component {
  static contextType = NoteContext;

  static propTypes = {
    folderId: PropTypes.string
  };

  render() {
    let notes = this.context.notes;
    if (this.props.folderId) notes = notes.filter(note => note.folder_id == this.props.folderId);

    return (
      <>
        <ul className="noteContainer">
          {notes.map(note => (
            <Note key={note.id} id={note.id} name={note.name} date={new Date(note.modified).toDateString()} />
          ))}
          <li>
            <Link to="/addNote">
              <button className="addNote">Add Note</button>
            </Link>
          </li>
        </ul>
      </>
    );
  }
}
