import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainSidebar.css';
import NoteContext from '../NoteContext';
import history from '../history';

export default class MainSidebar extends Component {
  static contextType = NoteContext;

  folderButtons = folders => {
    return (
      <ul className="sideNav">
        {folders.map(folder => (
          <li>
            <button className="folderButton" onClick={() => history.push(`/${folder.id}`)}>
              {folder.name}
            </button>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { folders } = this.context;
    return (
      <nav className="sideBar">
        {this.folderButtons(folders)}
        <Link to="/addFolder">
          <button className="addBtn">Add Folder</button>
        </Link>
      </nav>
    );
  }
}
