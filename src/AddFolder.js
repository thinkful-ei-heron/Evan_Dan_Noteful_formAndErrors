import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ValidationError from './ValidationError';
import PropTypes from 'prop-types';
import './App.css';

export default class AddFolder extends Component {
  state = {
    id: '',
    name: ''
  };

  static propTypes = {
    addFolder: PropTypes.func
  };

  updateName(name) {
    this.setState({ name: name });
  }

  validateName() {
    const name = this.state.name.trim();
    if (name.length === 0) {
      return 'Name is required';
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addFolder(this.state.name);
  }

  render() {
    const nameError = this.validateName();

    return (
      <form name="addFolder" onSubmit={e => this.handleSubmit(e)}>
        <label htmlFor="name">Folder Name</label>
        <input name="name" id="name" type="text" onChange={e => this.updateName(e.target.value)} />
        <ValidationError message={nameError} />
        <Link to="/">
          <button type="reset">Cancel</button>
        </Link>
        <button type="submit" disabled={this.validateName()}>
          Submit
        </button>
      </form>
    );
  }
}
