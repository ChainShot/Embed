import React, {Component} from 'react';
import {RunOutput} from 'chainshot-runoutput';
import {connect} from 'react-redux';
import './RunResults.scss';

class RunResults extends Component {
  render() {
    const { execution: { output, running }, ui: { focus } } = this.props;
    if(focus !== "results") return null;
    if(running) return <div className="run-output"> Running your tests... </div>
    if(!output) return <div className="run-output"> Execution stopped. </div>
    return <RunOutput response={output} />
  }
}

const mapStateToProps = ({ execution, ui }) => ({ execution, ui });

export default connect(
  mapStateToProps,
)(RunResults);
