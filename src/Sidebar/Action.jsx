import React, { Component } from 'react';
import './Action.scss';
import SVG from '../SVG';

class Action extends Component {
  render() {
    const { runCode, updateActive, activePane, executionStatus: { output, running } } = this.props;
    const actionClasses = ['action'];
    if(activePane === 'results') actionClasses.push('active');
    if(running) {
      actionClasses.push('running', 'clickable');
      return (
        <div className={actionClasses.join(' ')} onClick={runCode}> 
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
              <div className="clickable" onClick={() => updateActive('results')}>
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
              <div className="clickable" onClick={() => updateActive('results')}>
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