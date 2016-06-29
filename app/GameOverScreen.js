import React, { Component } from 'react';
import {render} from 'react-dom';

class GameOver extends Component {

  render() {
    return (
      <div className='game-over-screen'>
        <p>{this.props.gameOverMsg}</p>
        <button onClick={this.props.onClick}>Restart</button>
      </div>
    );
  }
}

export default GameOver;