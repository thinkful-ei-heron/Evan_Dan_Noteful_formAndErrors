import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './reset.css';
import './App.css';
import MainSidebar from './Nav/MainSidebar';
import NoteSidebar from './Nav/NoteSidebar';
import NoteView from './Note/NoteView';
import NoteList from './Main/NoteList';
import NoteContext from './NoteContext';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import ErrorPage from './ErrorPage';
import history from './history';

export default class App extends Component {
  state = {
    folders: [],
    notes: []
  };

  componentDidMount() {
    fetch('http://localhost:8000/api/folders')
      .then(res => res.json())
      .then(data => this.setState({ folders: data }));

    fetch('http://localhost:8000/api/notes')
      .then(res => res.json())
      .then(data => this.setState({ notes: data }));
  }

  addFolder = folderName => {
    fetch('http://localhost:8000/api/folders', {
      method: 'POST',
      body: JSON.stringify({ name: folderName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ folders: [...this.state.folders, data] });
        history.push('/');
      })
      .catch(err => console.log(err));
  };

  addNote = (noteName, noteContent, folderId) => {
    fetch(`http://localhost:8000/api/notes`, {
      method: 'POST',
      body: JSON.stringify({
        name: noteName,
        content: noteContent,
        folder_id: folderId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({ notes: [...this.state.notes, data] });
        history.push('/');
      })
      .catch(err => console.log(err));
  };

  deleteNote = noteId => {
    fetch(`http://localhost:8000/api/notes/${noteId}`, {
      method: 'DELETE'
    })
      .then(this.setState({ notes: this.state.notes.filter(note => note.id !== noteId) }))
      .then(console.log(this.state.notes));
  };

  render() {
    return (
      <>
        <NoteContext.Provider
          value={{
            folders: this.state.folders,
            notes: this.state.notes,
            deleteNote: this.deleteNote
          }}
        >
          <header className="header">
            <Link to="/">
              <h1>Noteful</h1>
            </Link>
          </header>
          <main>
            <Switch>
              <Route
                path="/note"
                render={props => <NoteSidebar goBackEvent={e => props.history.goBack()} />}
              />
              <Route exact path="/addNote" component={() => <AddNote addNote={this.addNote} />} />
              <Route path="/addFolder" component={() => <AddFolder addFolder={this.addFolder} />} />
              <Route path="/" component={() => <MainSidebar />} />
            </Switch>
            <section className="mainSection">
              <ErrorPage>
                <Route exact path="/" component={() => <NoteList />} />
                <Route
                  exact
                  path="/:folderId"
                  render={props => <NoteList folderId={props.match.params.folderId} />}
                />
                <Route
                  exact
                  path="/note/:noteId"
                  render={props => <NoteView noteId={props.match.params.noteId} />}
                />
              </ErrorPage>
            </section>
          </main>
        </NoteContext.Provider>
      </>
    );
  }
}
