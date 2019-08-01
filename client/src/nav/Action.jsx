import React, { Component } from 'react';
import './Action.scss';
import { RESULTS_FOCUS } from '../config';
import SVG from '../SVG';

class Action extends Component {
  render() {
    const { runCode, stopExecution, updateActive, activePane, executionStatus: { output, running } } = this.props;
    const actionClasses = ['action'];
    if(activePane === RESULTS_FOCUS) actionClasses.push('active');
    if(running) {
      actionClasses.push('running', 'clickable');
      return (
        <div className={actionClasses.join(' ')} onClick={stopExecution}>
          <label> Running... </label>
          <SVG name="stop" />
        </div>
      )
    }
    else if(output) {
      if(output.result.completed) {
        actionClasses.push('passed');
        return (
          <div className={actionClasses.join(' ')}>
            <label> Tests Passed! </label>
            <div className="split">
              <div className="clickable" onClick={runCode}>
                <SVG name="redo" />
              </div>
              <div className="clickable" onClick={() => updateActive(RESULTS_FOCUS)}>
                <SVG name="search" />
              </div>
            </div>
          </div>
        )
      }
      else {
        actionClasses.push('failed');
        return (
          <div className={actionClasses.join(' ')}>
            <label> Tests Failed </label>
            <div className="split">
              <div className="clickable" onClick={runCode}>
                <SVG name="redo" />
              </div>
              <div className="clickable search" onClick={() => updateActive(RESULTS_FOCUS)}>
                <SVG name="search" />
              </div>
            </div>
          </div>
        )
      }
    }
    actionClasses.push('run', 'clickable');
    return (
      <div className={actionClasses.join(' ')} onClick={runCode}>
        <label> Run Tests </label>
        <SVG name="play" />
      </div>
    )
  }
}

export default Action;
