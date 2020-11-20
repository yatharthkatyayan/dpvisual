import React, { Component } from "react";
import "../../App.css";

class EDTree extends Component {
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
      middle,
      value,
      mod,
      thread,
      returned_value,
      calculated,
    } = this.props;
    let color_back = "white";
    let color_text = "black";
    if (calculated) {
      color_back = "black";
      color_text = "white";
    }
    return (
      <g>
        <circle
          cx={x * 45 + 50}
          cy={y * 150 + 50}
          r="35"
          fill={color_back}
          stroke="black"
          strokeWidth="5px"
          parent={parent}
          id={id}
          x={x}
          y={y}
          left={left}
          right={right}
          middle={middle}
          str1_idx={str1_idx}
          str2_idx={str2_idx}
          value={value}
          mod={mod}
          thread={thread}
          returned_value={returned_value}
          calculated={calculated}
        ></circle>
        <text
          x={x * 45 + 50}
          y={y * 150 + 50}
          fill={color_text}
          className="treedata"
        >
          {value}
        </text>
      </g>
    );
  }
}

export default EDTree;
