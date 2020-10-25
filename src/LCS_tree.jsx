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
    } = this.props;
    return (
      <div
        parent={parent}
        id={id}
        x={x}
        y={y}
        left={left}
        right={right}
        str1_idx={str1_idx}
        str2_idx={str2_idx}
        value={value}
      >
        {value}
      </div>
    );
  }
}

export default LCSTree;
