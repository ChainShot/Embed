import React, { Component } from 'react';
import './App.scss';
import api from './utils/api';
import searchParams from './utils/routeParams';
import CodeFile from './pane/CodeFile';
import Sidebar from './nav/Sidebar';
import RunResults from './pane/RunResults';

const { apiKey, stageId } = searchParams();

class App extends Component {
  state = {
    codeFiles: [],
    activePane: null,
    executionStatus: {
      running: false,
      output: null,
      id: 0,
    },
  }
  async componentDidMount() {
    const { data: { codeFiles }} = await api.get(`content/${stageId}?api_key=${apiKey}`);
    this.setState({
      codeFiles,
      activePane: codeFiles[0].id,
    });
  }
  updateActive = (activePane) => {
    this.setState({ activePane })
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
  stopExecution = () => {
    this.setState({ executionStatus: {
      ...this.state.executionStatus,
      running: false,
      id: this.state.executionStatus.id + 1,
    }});
  }
  runCode = async () => {
    const {codeFiles, executionStatus: { id }} = this.state;

    const files = codeFiles.map(({ code, initialCode, id }) => ({
      id, contents: (code === undefined) ? initialCode : code
    }));

    this.setState({ executionStatus: {
      ...this.state.executionStatus,
      running: true,
      output: null,
    }, activePane: 'results' });

    const { data } = await api.post(`execute/${stageId}?api_key=${apiKey}`, { files });

    const latestId = this.state.executionStatus.id;
    // check the id has not changed, otherwise ignore
    if(latestId === id) {
      this.setState({ executionStatus: {
        running: false,
        output: data,
        id: id + 1,
      }});
    }
  }
  render() {
    if(!apiKey) return <div> API Key not provided </div>
    const { codeFiles, activePane, executionStatus } = this.state;
    return (
      <div className="app">
        <Sidebar codeFiles={codeFiles}
                  activePane={activePane}
                  updateActive={this.updateActive}
                  executionStatus={executionStatus}
                  stopExecution={this.stopExecution}
                  runCode={this.runCode}/>
        <CodeFile codeFiles={codeFiles}
                  activeCodeFileId={activePane}
                  updateCode={this.updateCode} />
        <RunResults activePane={activePane}
                executionStatus={executionStatus} />
      </div>
    );
  }
}

export default App;
