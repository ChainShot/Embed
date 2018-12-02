import React, {Component} from 'react';
import {RunOutput} from 'chainshot-runoutput';
import './RunResults.scss';

class RunResults extends Component {
  render() {
    const { executionStatus: { output, running }, activePane } = this.props;
    if(activePane !== "results") return null;
    if(running) return <div className="run-output"> Running your tests... </div>
    return <RunOutput response={output} />
  }
}

export default RunResults;