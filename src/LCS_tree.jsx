import React, { Component } from "react";
import "./App.css";

class LCSTree extends Component {
  state = {};
  render() {
    const {
      parent,
      str1_idx,
      str2_idx,
      id,
      x,
      y,
      left,
      right,
      value,
      mod,
      thread,
    } = this.props;

    return (
      <g>
        <circle
          cx={x * 35 + 100}
          cy={y * 100 + 100}
          r="25"
          fill="yellow"
          parent={parent}
          id={id}
          x={x}
          y={y}
          left={left}
          right={right}
          str1_idx={str1_idx}
          str2_idx={str2_idx}
          value={value}
          mod={mod}
          thread={thread}
        >
          {value}
        </circle>
      </g>
    );
  }
}

export default LCSTree;
