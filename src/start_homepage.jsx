import React, { Component } from "react";
class homepage extends Component {
  state = {};
  render() {
    return (
      <div className="hope">
        <svg viewBox={`0 0 1000 500`} className="svg">
          <g>
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
          </g>
          <g>
            <text x={15} y={280}>
              P
            </text>
            <text x={100} y={350}>
              R
            </text>
            <text x={230} y={450}>
              O
            </text>
            <text x={360} y={290}>
              G
            </text>
            <text x={440} y={380}>
              R
            </text>
            <text x={510} y={295}>
              A
            </text>
            <text x={640} y={490}>
              M
            </text>
            <text x={740} y={260}>
              M
            </text>
            <text x={810} y={390}>
              I
            </text>
            <text x={915} y={265}>
              N
            </text>
            <text x={990} y={180}>
              G
            </text>
          </g>
        </svg>
      </div>
    );
  }
}

export default homepage;
