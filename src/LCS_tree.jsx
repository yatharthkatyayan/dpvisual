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
    let pos_style = {
      marginTop: `${y * 60}px`,
      marginLeft: `${x * 25}px`,
    };
    return (
      <div
        className={`treenode`}
        style={pos_style}
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
      </div>
    );
  }
}

export default LCSTree;
