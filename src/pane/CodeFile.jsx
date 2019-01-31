import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import { connect } from 'react-redux';
import { codeUpdate } from '../redux/actions';

class CodeFile extends Component {
  render() {
    const { codeFiles, ui: { focus }, codeUpdate } = this.props;
    const activeCodeFile = codeFiles.filter(x => x.id === focus)[0];
    if(!activeCodeFile) return null;
    const { id, initialCode, code, mode } = activeCodeFile;
    const currentCode = (code === undefined) ? initialCode : code;
    return <CodeEditor key={id}
                        code={currentCode}
                        mode={mode}
                        onUpdate={(code) => codeUpdate(id, code)} />
  }
}

const mapStateToProps = ({ execution, codeFiles, ui }) => ({ execution, codeFiles, ui });
const mapDispatchToProps = { codeUpdate }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeFile);
