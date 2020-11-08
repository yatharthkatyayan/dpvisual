import React, { Component } from "react";

class homepage extends Component {
  state = {};

  render() {
    return (
      <div className="homepage_screen">
        <svg viewBox={`0 0 1000 500`} className="">
          <g className=" home_animation">
            <text x={300} y={200}>
              D
            </text>
            <text x={350} y={200}>
              Y
            </text>
            <text x={400} y={200}>
              N
            </text>
            <text x={450} y={200}>
              A
            </text>
            <text x={500} y={200}>
              M
            </text>
            <text x={550} y={200}>
              I
            </text>
            <text x={600} y={200}>
              C
            </text>
          </g>
          <g className=" home_animation">
            <text x={200} y={280}>
              P
            </text>
            <text x={250} y={280}>
              R
            </text>
            <text x={300} y={280}>
              O
            </text>
            <text x={350} y={280}>
              G
            </text>
            <text x={400} y={280}>
              R
            </text>
            <text x={450} y={280}>
              A
            </text>
            <text x={500} y={280}>
              M
            </text>
            <text x={550} y={280}>
              M
            </text>
            <text x={600} y={280}>
              I
            </text>
            <text x={650} y={280}>
              N
            </text>
            <text x={700} y={280}>
              G
            </text>
          </g>
        </svg>
      </div>
    );
  }
}

export default homepage;
