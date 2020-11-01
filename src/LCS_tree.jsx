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
          // className="treenode"
          cx={x * 85 + 50}
          cy={y * 150 + 50}
          r="35"
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
