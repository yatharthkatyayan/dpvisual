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
        ></rect>
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
