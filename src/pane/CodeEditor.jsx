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
    const {code, mode, onUpdate, onSelection} = this.props;
    this.editor = monaco.editor.create(this.refs.container, {
      ...defaultMonacoOptions,
      theme,
      value: code,
      language: mode,
    });
    this.editor.onDidChangeCursorSelection(({ selection }) => {
      const ts = Date.now();
      onSelection({ selections: { updates: [selection], ts }});
    });
    this.editor.onDidChangeModelContent((e) => {
      const ts = Date.now();
      onUpdate({
        value: this.editor.getValue(),
        selections: { updates: this.editor.getSelections(), ts },
        changes: e.changes.map(x => ({ ...x, ts })),
      });
    });
  }
  componentDidUpdate(prevProps) {
    const { changes, watchMode, code, selections } = this.props;
    if(watchMode) {
      const { latestChange } = this.state;
      if((changes || []).length > (prevProps.changes || []).length) {
        const updates = changes.filter(x => x.ts > latestChange);
        const mostRecent = updates.sort((a,b) => b.ts - a.ts)[0];
        if(updates.length > 0) {
          try {
            this.editor.executeEdits('updates', updates, selections.updates);
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
      if(selections && (selections.ts > latestChange)) {
        this.editor.setSelections(selections.updates);
      }
    }
    if((prevProps.code !== code) && (code !== this.editor.getValue())) {
      this.editor.setValue(code || "");
    }
  }
  onKeyUp = () => {
    const { code, watchMode } = this.props;
    if(watchMode && code !== this.editor.getValue()) {
      this.editor.setValue(code || "");
    }
  }
  onKeyPress = (evt) => {
    if(this.props.watchMode) {
      evt.preventDefault();
    }
  }
  render() {
    return <div
      className="code-editor"
      ref="container"
      onKeyUp={this.onKeyUp}
      onKeyPress={this.onKeyPress}/>
  }
}

export default CodeEditor;
