import React, { Component } from 'react';
import Files from './Files';
import Action from './Action';
import './Sidebar.scss';

class Sidebar extends Component {
  render() {
    const { codeFiles, activePane, updateActive, runCode, executionStatus, stopExecution } = this.props;
    return (
      <div className="sidebar">
        <label> Files </label>
        <Files codeFiles={codeFiles} activeCodeFileId={activePane} updateActive={updateActive} />
        <Action runCode={runCode} executionStatus={executionStatus} updateActive={updateActive} stopExecution={stopExecution} activePane={activePane}/>
      </div>
    )
  }
}

export default Sidebar;
