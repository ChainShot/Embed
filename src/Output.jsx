import React, {Component} from 'react';
import {RunOutput} from 'chainshot-runoutput';

class Output extends Component {
  render() {
    return <RunOutput response={response} />
  }
}