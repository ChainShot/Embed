import React, { Component } from 'react';
import CodeFile from './pane/CodeFile';
import Sidebar from './nav/Sidebar';
import RunResults from './pane/RunResults';
import './runner';
import './loader';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Sidebar />
        <CodeFile />
        <RunResults />
      </div>
    );
  }
}

export default App;
