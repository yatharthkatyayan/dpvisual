import React, { Component } from "react";
import "../../App.css";

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
      returned_value,
    } = this.props;

    return (
      <g>
        <circle
          className="circle"
          cx={x * 45 + 50}
          cy={y * 150 + 50}
          r="35"
          fill="white"
          stroke="black"
          strokeWidth="5px"
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
          returned_value={returned_value}
        ></circle>
        <text x={x * 45 + 50} y={y * 150 + 50} className="treedata circle">
          {value}
        </text>
      </g>
    );
  }
}

export default LCSTree;
