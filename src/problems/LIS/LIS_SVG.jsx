import React, { Component } from "react";
class LIScurve extends Component {
  state = {};
  render() {
    const { curve = "", midpx, midpy } = this.props;
    return (
      <g>
        <path
          d={curve}
          stroke="black"
          strokeWidth="1px"
          stroke-linecap="round"
          strokeWidth="4px"
          fill="transparent"
        ></path>
        <text x={midpx} y={midpy} fontSize="4px">
          0
        </text>
      </g>
    );
  }
}

export default LIScurve;
