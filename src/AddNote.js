import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ValidationError from './ValidationError';
import NoteContext from './NoteContext';

export default class AddNote extends Component {
  static contextType = NoteContext;

  state = {
    id: '',
    name: '',
    content: '',
    modified: '',
    folderId: ''
  };

  updateName(name) {
    this.setState({ name: name });
  }

  updateContent(content) {
    this.setState({ content: content });
  }

  updateFolderId(folderId) {
    this.setState({ folderId: folderId });
  }

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }

  validateContent() {
    const content = this.state.content.trim();
    if (content.length === 0) {
      return 'Content is required';
    }
  }

  validateSelect() {
    const select = this.state.folderId;
    if (select === 'Select Your Folder' || !select) {
      return 'Choose a folder for your note';
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addNote(this.state.name, this.state.content, this.state.folderId, this.state.id);
  }

  render() {
    const nameError = this.validateName();
    const contentError = this.validateContent();
    const { folders } = this.context;

    return (
      <form name="addNote" onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="name">Note Name</label>
        <input name="name" id="name" type="text" onChange={e => this.updateName(e.target.value)} />
        <ValidationError message={nameError} />
        <label htmlFor="content">Note Content</label>
        <input name="content" id="content" type="text" onChange={e => this.updateContent(e.target.value)} />
        <ValidationError message={contentError} />

        <label htmlFor="selectFolder">Select a folder for your note</label>
        <select
          required
          name="selectFolder"
          id="selectFolder"
          onChange={e => this.updateFolderId(e.target.value)}
        >
          <option>Select Your Folder</option>
          {folders.map(folder => (
            <option value={folder.id}>{folder.name}</option>
          ))}
        </select>

        <Link to="/">
          <button type="reset">Cancel</button>
        </Link>
        <button
          type="submit"
          disabled={this.validateName() || this.validateContent() || this.validateSelect()}
        >
          Submit
        </button>
      </form>
    );
  }
}
