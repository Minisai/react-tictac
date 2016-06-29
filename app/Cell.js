import React, { Component } from 'react';
import {render} from 'react-dom';

class Cell extends Component {

  render() {
    var classNames = 'cell player' + this.props.player;
    return (
      <div className={classNames} onClick={this.props.onClick}>
      </div>
    );
  }
}

export default Cell;