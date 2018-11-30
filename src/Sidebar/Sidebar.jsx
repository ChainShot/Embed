import React, { Component } from 'react';
import Files from './Files';
import RunTests from './RunTests';
import './Sidebar.scss';

class Sidebar extends Component {
  render() {
    const { codeFiles, activeCodeFileId, updateActive, runCode, executionStatus } = this.props;
    return (
      <div className="sidebar">
        <label> Files </label>
        <Files codeFiles={codeFiles} activeCodeFileId={activeCodeFileId} updateActive={updateActive} />
        <RunTests runCode={runCode} executionStatus={executionStatus} />
      </div>
    )
  }
}

export default Sidebar;
