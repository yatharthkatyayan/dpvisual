import React, { Component } from "react";
import "./App.css";

class LCSEdges extends Component {
  state = {};
  render() {
    const { x1, y1, x2, y2, value = 0 } = this.props;

    return (
      <g>
        <defs>
          <marker
            id="markerArrow1"
            markerWidth="6"
            markerHeight="4"
            refX="5"
            refY="2"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d={`M 2 0 L 2 4 L 6 2 Z`}></path>
          </marker>
        </defs>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="black"
          strokeWidth="5px"
          markerEnd="url(#markerArrow1)"
        ></line>
        <text className="lcs_text" x={(x1 + x2) / 2} y={(y1 + y2) / 2}>
          {value}
        </text>
      </g>
    );
  }
}

export default LCSEdges;
