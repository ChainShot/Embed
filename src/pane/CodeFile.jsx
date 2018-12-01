import React, { Component } from 'react';
import CodeEditor from './CodeEditor';

class CodeFile extends Component {
  render() {
    const { codeFiles, activeCodeFileId, updateCode} = this.props;
    const activeCodeFile = codeFiles.filter(x => x.id === activeCodeFileId)[0];
    if(!activeCodeFile) return null;
    const { id, initialCode, code, mode } = activeCodeFile; 
    const currentCode = (code === undefined) ? initialCode : code;
    return <CodeEditor key={id} 
                        code={currentCode} 
                        mode={mode} 
                        onUpdate={(code) => updateCode(id, code)} />
  }
}

export default CodeFile;
