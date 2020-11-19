import React, { Component } from "react";
class LIScurve extends Component {
  state = {};
  render() {
    const { curve = "", midpx, midpy, font, check } = this.props;

    let comp = "";
    if (check == 0) {
      comp = "=";
    } else if (check == 1) {
      comp = "<";
    } else {
      comp = ">";
    }
    return (
      <g>
        <path
          d={curve}
          stroke="black"
          strokeWidth="1px"
          strokeWidth="4px"
          fill="transparent"
        ></path>
        <text
          x={midpx}
          y={midpy}
          fontSize={`${font}px`}
          stroke="black"
          strokeWidth="1px"
          className="LISdata"
        >
          {comp}
        </text>
      </g>
    );
  }
}

export default LIScurve;
