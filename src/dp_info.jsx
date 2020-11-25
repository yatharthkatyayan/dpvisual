import React, { Component } from "react";
let start = [];
let middle = [];
let last = [];
let time = 50;
let timeout_array = [];
class DpInfo extends Component {
  state = {};
  starter() {
    let time1;
    let gg =
      "Dynamic Programming is mainly an optimization over plain recursion.";
    for (let i = 0; i < gg.length; i++) {
      time1 = setTimeout(() => {
        start.push(gg[i]);
        if (document.getElementById("1"))
          document.getElementById("1").scrollIntoView();
        this.setState({ starter: start });
      }, time * i);
      timeout_array.push(time1);
    }
    time1 = setTimeout(() => {
      this.midder();
    }, time * gg.length + 500);
    timeout_array.push(time1);
  }
  midder() {
    let time1;
    let mid1 =
      "Wherever we see a recursive solution that has repeated calls for same inputs, we can optimize it using Dynamic Programming. The idea is to simply store the results of subproblems, so that we do not have to re-compute them when needed later.";
    for (let i = 0; i < mid1.length; i++) {
      time1 = setTimeout(() => {
        middle.push(mid1[i]);
        if (document.getElementById("2"))
          document.getElementById("2").scrollIntoView();
        this.setState({ midder: middle });
      }, time * i);
      timeout_array.push(time1);
    }

    timeout_array.push(time1);
    time1 = setTimeout(() => {
      this.laster();
    }, time * mid1.length + 2500);
    timeout_array.push(time1);
  }

  laster() {
    let time1;
    let last_1 =
      "This simple optimization reduces time complexities from exponential to polynomial. For example, if we write simple recursive solution for Fibonacci Numbers, we get exponential time complexity and if we optimize it by storing solutions of subproblems, time complexity reduces to linear.";
    for (let i = 0; i < last_1.length; i++) {
      time1 = setTimeout(() => {
        last.push(last_1[i]);
        if (document.getElementById("3"))
          document.getElementById("3").scrollIntoView();
        this.setState({ laster: last });
      }, time * i);
      timeout_array.push(time1);
    }
  }
  clear() {
    for (let i = 0; i < timeout_array.length; i++) {
      clearTimeout(timeout_array[i]);
    }
    start = [];
    middle = [];
    last = [];
    this.setState({ starter: start });
    this.setState({ midder: middle });
    this.setState({ laster: last });
  }
  componentDidMount() {
    this.clear();
    setTimeout(() => {
      this.starter();
    }, 3000);
  }
  componentWillUnmount() {
    this.clear();
  }
  render() {
    const { starter = [], midder = [], laster = [] } = this.state;
    return (
      <div className="info_div info">
        <div id="1">{starter}</div>

        <br></br>
        <div id="2">{midder}</div>

        <br />
        <div id="3">{laster}</div>
      </div>
    );
  }
}

export default DpInfo;
