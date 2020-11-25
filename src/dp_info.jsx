import React, { Component } from "react";
class DpInfo extends Component {
  state = {};
  render() {
    return (
      <div className="info_div info">
        Dynamic Programming is mainly an optimization over plain recursion.
        <br />
        <br></br>
        Wherever we see a recursive solution that has repeated calls for same
        inputs, we can optimize it using Dynamic Programming. The idea is to
        simply store the results of subproblems, so that we do not have to
        re-compute them when needed later.
        <br />
        <br />
        This simple optimization reduces time complexities from exponential to
        polynomial. For example, if we write simple recursive solution for
        Fibonacci Numbers, we get exponential time complexity and if we optimize
        it by storing solutions of subproblems, time complexity reduces to
        linear.
      </div>
    );
  }
}

export default DpInfo;
