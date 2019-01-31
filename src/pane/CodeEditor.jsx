import React, {Component} from 'react';
import * as monaco from 'monaco-editor'
import monacoTheme from '../utils/monacoTheme';
import defaultMonacoOptions from '../utils/monacoOptions';
import './CodeEditor.scss';

const theme = 'cs-theme';
monaco.editor.defineTheme(theme, monacoTheme);

class CodeEditor extends Component {
  componentDidMount() {
    const {code, mode, onUpdate} = this.props;
    this.editor = monaco.editor.create(this.refs.container, {
      ...defaultMonacoOptions,
      theme,
      value: code,
      language: mode,
    });
    this.editor.onDidChangeModelContent(() => {
      onUpdate(this.editor.getValue())
    });
  }
  componentDidUpdate(prevProps) {
    const { code } = this.props;
    if(prevProps.code !== code && code !== this.editor.getValue()) {
      this.editor.setValue(code || "");
    }
  }
  render() {
    return <div className="code-editor" ref="container" />
  }
}

export default CodeEditor;
