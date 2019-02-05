import React, { Component } from 'react';
import Files from './Files';
import Action from './Action';
import { connect } from 'react-redux';
import { codeRunCancel, codeRunStart, changeFocus } from '../redux/actions';
import './Sidebar.scss';

class Sidebar extends Component {
  render() {
    const { codeFiles, ui: { focus }, changeFocus, codeRunStart, execution, codeRunCancel } = this.props;
    return (
      <div className="sidebar">
        <Files codeFiles={codeFiles} activeCodeFileId={focus} updateActive={changeFocus} />
        <Action runCode={codeRunStart} executionStatus={execution} updateActive={changeFocus} stopExecution={codeRunCancel} activePane={focus}/>
      </div>
    )
  }
}

const mapStateToProps = ({ execution, codeFiles, ui }) => ({ execution, codeFiles, ui });
const mapDispatchToProps = { codeRunCancel, codeRunStart, changeFocus }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Sidebar);
