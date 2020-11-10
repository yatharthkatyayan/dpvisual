import React, { Component } from "react";
let numbers = [];
class LIS extends Component {
  state = {};

  lis(arr, n) {
    let DP_array = [];
    DP_array.push(1);
    for (let i = 1; i < n; i++) {
      DP_array.push(1);
      for (let j = 0; j < i; j++) {
        if (arr[i] > arr[j] && DP_array[i] < DP_array[j] + 1) {
          DP_array[i] = DP_array[j] + 1;
        }
      }
    }
    let ans = 0;
    for (let i = 0; i < n; i++) {
      console.log(DP_array[i]);
      if (ans < DP_array[i]) {
        ans = DP_array[i];
      }
    }
    return ans;
  }

  takeValues() {
    let val = document.getElementById("Input_1").value;
    let number_pattern = /\d+/g;
    numbers = val.match(number_pattern);
    if (numbers) {
      for (let i = 0; i < numbers.length; i++) {
        numbers[i] = parseInt(numbers[i], 10);
      }
    }
  }
  visualize() {
    this.takeValues();
    let x = this.lis(numbers, numbers.length);
    console.log("ans :", x);
  }
  render() {
    return (
      <div className="parent_div">
        <div className="menu">
          <div>
            <input
              id="Input_1"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="Input Array here"
            />
          </div>
          <div>
            <button className="lcs-visual" onClick={() => this.visualize()}>
              Visualize
            </button>
          </div>
        </div>

        <div className="hope">
          <div className="padding_style"></div>
        </div>
      </div>
    );
  }
}

export default LIS;
