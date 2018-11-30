import React, { Component } from 'react';
import './RunTests.scss';

class RunTests extends Component {
  render() {
    const { runCode, executionStatus: { output, running } } = this.props;
    if(running) {
      return (
        <div className="action running" onClick={runCode}> 
          Running Tests
          <span> Hang on a sec... </span>
        </div>
      )
    }
    else if(output) {
      return (
        <div className="action failed" onClick={runCode}> 
          Tests Failed <br/>
          <span> Click to see why </span>
        </div>
      )
    }
    return (
      <div className="action run" onClick={runCode}> 
        Run Tests <br/>
        <span> CMD + ENTER </span>
      </div>
    )
  }
}

export default RunTests;