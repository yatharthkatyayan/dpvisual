import React, { Component } from "react";
import "./App.css";

class LCSEdges extends Component {
  state = {};
  render() {
    const { x1, y1, x2, y2, value } = this.props;

    return (
      <g>
        <line x1={x1} y1={y1} x2={x2} y2={y2}></line>
        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2}>
          {value}
        </text>
      </g>
    );
  }
}

export default LCSEdges;
