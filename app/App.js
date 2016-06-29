import React, { Component } from 'react';
import {render} from 'react-dom';
import Board from './Board'

class App extends Component {
  render() {
    return (
      <Board></Board>
    );
  }
}

render(<App />, document.getElementById('root'));


