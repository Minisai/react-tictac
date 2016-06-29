import React, { Component } from 'react';
import {render} from 'react-dom';
import Cell from './Cell'
import GameOverScreen from './GameOverScreen'

class Board extends Component {
  constructor(){
    super();
    this.state = {boardData: this.initBoardData(), player: 1};
  }

  initBoardData() {
    var size = 3;
    var boardData = Array(size);
    for (var i = 0; i < size; i++) {
      var row = Array(size);
      for (var j = 0; j < size; j++) {
        row[j] = 0;
      }
      boardData[i] = row;
    }
    return boardData;
  }

  restartGame() {
    this.setState({boardData: this.initBoardData(), player: 1});
  }

  mark(row, col, player) {
    this.state.boardData[row][col] = player;
    return this.state.boardData;
  }

  hasMark(row, col) {
    return this.state.boardData[row][col] !== 0;
  }

  winner() {
    for (var i = 0; i < 3; i++) {
      if (this.state.boardData[i][0] !== 0 && this.state.boardData[i][0] === this.state.boardData[i][1] &&
          this.state.boardData[i][0] === this.state.boardData[i][2]) {
        return this.state.boardData[i][0];
      }
    }

    for (var i = 0; i < 3; i++) {
      if (this.state.boardData[0][i] !== 0 && this.state.boardData[0][i] === this.state.boardData[1][i] &&
          this.state.boardData[0][i] === this.state.boardData[2][i]) {
        return this.state.boardData[0][i];
      }
    }

    if (this.state.boardData[0][0] !== 0 && this.state.boardData[0][0] === this.state.boardData[1][1] &&
        this.state.boardData[0][0] === this.state.boardData[2][2]) {
      return this.state.boardData[0][0];
    }

    if (this.state.boardData[0][2] !== 0 && this.state.boardData[0][2] === this.state.boardData[1][1] &&
        this.state.boardData[0][2] === this.state.boardData[2][0]) {
      return this.state.boardData[0][2];
    }

    return null;
  }

  draw() {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        if (this.state.boardData[i][j] === 0) {
          return false;
        }
      }
    }
    return this.winner() === null;
  }

  nextPlayer() {
    return this.state.player === 1 ? 2 : 1;
  }

  handleCellClick(row, col) {
    if (this.hasMark(row, col)) {
      return;
    }
    this.setState({
      boardData: this.mark(row, col, this.state.player),
      player: this.nextPlayer()
    });
  }

  checkGameOver() {
    var draw = this.draw();
    var winner = this.winner();
    var message;

    if(draw || winner) {
      if(draw) {
        message = 'Draw!'
      } else {
        message = (winner === 1 ? 'Green' : 'Red') + ' wins!'
      }
    }

    return message;
  }

  buildRows() {
    return this.state.boardData.map((cells, row) =>
      <div className='row' key={'row' + row}>
        {cells.map((player, col) =>
          <Cell
            key={'cell' + col}
            player={player}
            onClick={this.handleCellClick.bind(this, row, col)}
          />
        )}
      </div>
    );
  }

  render() {
    var gameOverMsg = this.checkGameOver();

    if(gameOverMsg) {
      return (
        <GameOverScreen gameOverMsg={gameOverMsg} onClick={this.restartGame.bind(this)}/>
      );
    } else {
      return (
        <div className='board'>
          {this.buildRows()}
        </div>
      );
    }
  }
}

export default Board;