import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ENDPOINTS from './core/endpoints';
import entitiesConnector from './flux/entities/Entities';
import Repo from './components/Repo';

const Stargazers = entitiesConnector('stargazers', {
  get: ENDPOINTS.stargazers,
});

const Repos = entitiesConnector('repos', {
  get: ENDPOINTS.repos,
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Stargazers>
          {({ entities }) => (
            <div>hey</div>
          )}
        </Stargazers>
        <Repos>
          {(props) => (
            <div>hey</div>
          )}
        </Repos>
      </div>
    );
  }
}

export default App;
