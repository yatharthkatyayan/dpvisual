import React, { Component } from "react";
class LIS_array extends Component {
  state = {};
  render() {
    const { value, x1, y1, font } = this.props;
    return (
      <g>
        <rect
          width="75"
          height="75"
          fill="white"
          stroke="black"
          strokeWidth="4px"
          y={y1}
          x={x1}
        >
          <animate
            attributeName="rx"
            values="0;150;0"
            begin="click"
            dur="0.5s"
            repeatCount="20"
          />
        </rect>
        <text
          x={x1 + 35}
          y={y1 + 35}
          className="LISdata"
          fontSize={`${font}px`}
          //  lengthAdjust="spacingAndGlyphs"
          //  textLength="70"
        >
          {value}
        </text>
      </g>
    );
  }
}

export default LIS_array;
