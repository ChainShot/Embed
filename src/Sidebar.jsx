import React, { Component } from 'react';
import './Sidebar.scss';
import CodeEditor from './CodeEditor';

class Sidebar extends Component {
  render() {
    const { codeFiles, activeCodeFileId, updateActive, runCode } = this.props;
    return (
      <div className="sidebar">
        <label> Files </label>
        <ul className="files">
          {codeFiles.map(({id, name}) => {
            const classes = [];
            if(id === activeCodeFileId) classes.push('active');
            return (
              <li key={id} 
                  className={classes.join(' ')} 
                  onClick={() => updateActive(id)}>{ name }</li>
            )
          })}
        </ul>
        
        <div className="run" onClick={runCode}> 
          Run Tests <br/>
          <span> CMD + ENTER </span>
        </div>
      </div>
    )
  }
}

export default Sidebar;
