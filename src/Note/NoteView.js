import React, { Component } from 'react';
import Note from './Note';
import './NoteView.css';
import NoteContext from '../NoteContext';
import PropTypes from 'prop-types';

export default class NoteView extends Component {
  static contextType = NoteContext;

  static propTypes = {
    noteId: PropTypes.string
  };
  render() {
    const { folders, notes } = this.context;

    let note = notes.find(note => note.id == this.props.noteId);
    return (
      <>
        <ul className="noteContainer">
          <Note
            key={note.id}
            id={note.id}
            name={note.name}
            date={new Date(note.modified).toDateString()}
            description={note.content}
          />
        </ul>
        <div className="folderName">
          <h2>{folders.find(folder => folder.id === note.folder_id).name}</h2>
        </div>
      </>
    );
  }
}
