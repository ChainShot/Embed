import React, { Component } from 'react';
import CodeFile from './pane/CodeFile';
import Sidebar from './nav/Sidebar';
import RunResults from './pane/RunResults';
import './network/runner';
import './network/loader';
import './network/listener';
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
