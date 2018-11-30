import React, { Component } from 'react';
import './Files.scss';

class Files extends Component {
  render() {
    const { codeFiles, activeCodeFileId, updateActive } = this.props;
    return (
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
    )
  }
}

export default Files;