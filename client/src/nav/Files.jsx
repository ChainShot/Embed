import React, { Component } from 'react';
import SVG from '../SVG';
import './Files.scss';

class Files extends Component {
  render() {
    const { codeFiles, activeCodeFileId, updateActive } = this.props;
    return (
      <ul className="files">
        {codeFiles.map(({id, name, testFixture}) => {
          const classes = [];
          if(id === activeCodeFileId) classes.push('active');
          const svgName = testFixture ? 'flask' : 'editable';
          return (
            <li key={id}
                className={classes.join(' ')}
                onClick={() => updateActive(id)}>
                <SVG name={svgName} />
                { name }
            </li>
          )
        })}
      </ul>
    )
  }
}

export default Files;
