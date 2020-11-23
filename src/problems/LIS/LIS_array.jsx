import React, { Component } from "react";
class LIS_array extends Component {
  state = {};
  render() {
    const { value, x1, y1, font, incheck = 0 } = this.props;
    let b_color = "white";
    if (incheck == -1) {
      b_color = "#2196f3";
    } else if (incheck == 0) {
      b_color = "white";
    } else {
      b_color = "#4caf50";
    }
    return (
      <g>
        <rect
          width="75"
          height="75"
          fill={b_color}
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
        >
          {value}
        </text>
      </g>
    );
  }
}

export default LIS_array;
