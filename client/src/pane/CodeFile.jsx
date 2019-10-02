import React, { Component } from 'react';
import CodeEditor from './CodeEditor';
import { connect } from 'react-redux';
import { codeUpdate, codeSelections, codeRunStart } from '../redux/actions';

class CodeFile extends Component {
  render() {
    const { codeFiles, ui: { focus, watchMode }, codeUpdate, codeSelections, codeRunStart } = this.props;
    const activeCodeFile = codeFiles.filter(x => x.id === focus)[0];
    if(!activeCodeFile) return null;
    const { id, initialCode, code, changes, mode, selections } = activeCodeFile;
    const currentCode = (code === undefined) ? initialCode : code;
    return <CodeEditor key={id}
                        code={currentCode}
                        changes={changes}
                        mode={mode}
                        watchMode={watchMode}
                        selections={selections}
                        codeRunStart={codeRunStart}
                        onSelection={({ selections }) => codeSelections(id, selections)}
                        onUpdate={({ value, changes, selections }) => codeUpdate(id, value, changes, selections)} />
  }
}

const mapStateToProps = ({ execution, codeFiles, ui }) => ({ execution, codeFiles, ui });
const mapDispatchToProps = { codeUpdate, codeSelections, codeRunStart }

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CodeFile);
