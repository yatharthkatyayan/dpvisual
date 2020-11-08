import React, { Component } from "react";
class homepage extends Component {
  state = {};
  render() {
    return (
      <div className="hope">
        <svg viewBox={`0 0 1000 500`} className="svg">
          <text x={0} y={50}>
            D
          </text>
          <text x={200} y={150}>
            Y
          </text>
          <text x={350} y={90}>
            N
          </text>
          <text x={500} y={180}>
            A
          </text>
          <text x={630} y={30}>
            M
          </text>
          <text x={780} y={140}>
            I
          </text>
          <text x={900} y={110}>
            C
          </text>
        </svg>
      </div>
    );
  }
}

export default homepage;
