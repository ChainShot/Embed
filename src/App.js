import React, { Component } from 'react';
import './App.scss';
import api from './utils/api';
import searchParams from './utils/searchParams';
import CodeFile from './CodeFile';
import Sidebar from './Sidebar/Sidebar';

const { api_key } = searchParams();

class App extends Component {
  state = {
    codeFiles: [],
    activeCodeFileId: null,
    executionStatus: {
      running: false,
      output: null,
    },
  }
  async componentDidMount() {
    const { data: { codeFiles }} = await api.get(`content/5adab204929d249e5faefb4d?api_key=${api_key}`);
    this.setState({ 
      codeFiles,
      activeCodeFileId: codeFiles[0].id,
    });
  }
  updateActive = (activeCodeFileId) => {
    this.setState({ activeCodeFileId })
  }
  updateCode = (id, code) => {
    const { codeFiles } = this.state;
    const idx = codeFiles.findIndex(x => x.id === id);
    const codeFile = codeFiles.find(x => x.id === id);
    this.setState({
      codeFiles: [
        ...codeFiles.slice(0, idx),
        { ...codeFile, code },
        ...codeFiles.slice(idx+1),
      ]
    });
  }
  runCode = async () => {
    const {codeFiles} = this.state;

    const files = codeFiles.map(({ code, initialCode, executablePath }) => ({
      contents: (code === undefined) ? initialCode : code,
      path: executablePath,
    }));
  
    this.setState({ executionStatus: {
      running: true,
      output: null,
    }});
    
    const { data } = await api.post(`execute/5adab204929d249e5faefb4d?api_key=${api_key}`, { files });
    
    this.setState({ executionStatus: {
      running: false,
      output: data,
    }});
  }
  render() {
    if(!api_key) return <div> API Key not provided </div>
    const { codeFiles, activeCodeFileId, executionStatus } = this.state;
    return (
      <div className="app">
        <Sidebar codeFiles={codeFiles} 
                  activeCodeFileId={activeCodeFileId} 
                  updateActive={this.updateActive} 
                  executionStatus={executionStatus}
                  runCode={this.runCode}/>
        <CodeFile codeFiles={codeFiles} 
                  activeCodeFileId={activeCodeFileId} 
                  updateCode={this.updateCode} />
      </div>
    );
  }
}

export default App;
