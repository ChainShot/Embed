import React, {Component} from 'react';
import * as monaco from 'monaco-editor'
import monacoTheme from '../utils/monacoTheme';
import defaultMonacoOptions from '../utils/monacoOptions';
import './CodeEditor.scss';

const theme = 'cs-theme';
monaco.editor.defineTheme(theme, monacoTheme);

class CodeEditor extends Component {
  state = {
    latestChange: null,
  }
  componentDidMount() {
    const {code, mode, watchMode, onUpdate} = this.props;
    this.editor = monaco.editor.create(this.refs.container, {
      ...defaultMonacoOptions,
      theme,
      value: code,
      language: mode,
    });
    this.editor.onDidChangeModelContent((e) => {
      if(!watchMode) {
        const ts = Date.now();
        onUpdate({
          value: this.editor.getValue(),
          changes: e.changes.map(x => ({ ...x, ts })),
        });
      }
    });
  }
  componentDidUpdate(prevProps) {
    const { changes, watchMode, code } = this.props;
    if(watchMode) {
      if((changes || []).length > (prevProps.changes || []).length) {
        const updates = changes.filter(x => x.ts > this.state.latestChange);
        const mostRecent = updates.sort((a,b) => b.ts - a.ts)[0];
        if(updates.length > 0) {
          try {
            this.editor.executeEdits('updates', updates);
          }
          catch(ex) {
            // overlapping ranges across a series of updates can cause issues
            // we may be able to detect this early with further optimization
            // for now if we run into error we'll just warn & replace the code
            console.warn(`Failed to execute edits`, { ex, updates });
            this.editor.setValue(code || "");
          }
          this.setState({ latestChange: mostRecent.ts });
        }
      }
    }
    if((prevProps.code !== code) && (code !== this.editor.getValue())) {
      this.editor.setValue(code || "");
    }
  }
  render() {
    return <div className="code-editor" ref="container" />
  }
}

export default CodeEditor;
