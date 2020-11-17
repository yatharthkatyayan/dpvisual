import React, { Component } from "react";
import "../../App.css";

class LCSEdges extends Component {
  state = {};
  render() {
    const { x_1, y_1, x_2, y_2, value = -1, time } = this.props;

    if (value != -1) {
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
            x1={x_1}
            y1={y_1}
            x2={x_2}
            y2={y_2}
            stroke="black"
            strokeWidth="5px"
            markerEnd="url(#markerArrow1)"
          >
            <animate
              id={`edge ${x_1} ${y_1} ${x_2} ${y_2} 1`}
              attributeName="x2"
              from={`${x_1}`}
              to={`${x_2}`}
              begin="indefinite"
              dur="0.2s"
              repeatCount="1"
              restart="whenNotActive"
            />
            <animate
              id={`edge ${x_1} ${y_1} ${x_2} ${y_2} 2`}
              attributeName="y2"
              from={`${y_1}`}
              to={`${y_2}`}
              begin="indefinite"
              dur="0.2s"
              repeatCount="1"
              restart="whenNotActive"
            />
          </line>

          <text className="lcs_text " x={(x_1 + x_2) / 2} y={(y_1 + y_2) / 2}>
            {value}
          </text>
        </g>
      );
    } else {
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
            x1={x_1}
            y1={y_1}
            x2={x_2}
            y2={y_2}
            stroke="black"
            strokeWidth="5px"
            markerEnd="url(#markerArrow1)"
          >
            <animate
              id={`edge ${x_1} ${y_1} ${x_2} ${y_2} 1`}
              attributeName="x2"
              from={`${x_1}`}
              to={`${x_2}`}
              begin="indefinte"
              dur="0.2s"
              repeatCount="1"
              restart="whenNotActive"
            />
            <animate
              id={`edge ${x_1} ${y_1} ${x_2} ${y_2} 2`}
              attributeName="y2"
              from={`${y_1}`}
              to={`${y_2}`}
              begin="indefinite"
              dur="0.2s"
              repeatCount="1"
              restart="whenNotActive"
            />
          </line>
        </g>
      );
    }
  }
}

export default LCSEdges;
