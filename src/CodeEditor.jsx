import React, {Component} from 'react';
import * as monaco from 'monaco-editor'
import monacoTheme from './utils/monacoTheme';
import defaultMonacoOptions from './utils/monacoOptions';
import './CodeEditor.scss';

const theme = 'cs-theme';
monaco.editor.defineTheme(theme, monacoTheme);

class CodeEditor extends Component {
  componentDidMount() {
    const {code, mode, onUpdate} = this.props;
    const editor = monaco.editor.create(this.refs.container, {
      ...defaultMonacoOptions,
      theme,
      value: code,
      language: mode,
    });
    editor.onDidChangeModelContent(() => onUpdate(editor.getValue()));
  }
  render() {
    return <div className="code-editor" ref="container" />
  }
}

export default CodeEditor;
