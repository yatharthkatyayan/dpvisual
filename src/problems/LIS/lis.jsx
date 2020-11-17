import React, { Component } from "react";
import LIS_array from "./LIS_array";
import "../../App.css";

let numbers = [];
let DP_array = [];
let font_size = 0;
class LIS extends Component {
  state = {};

  lis(arr, n) {
    DP_array = [];
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
    let number_pattern = /-?\d*\.{0,1}\d+/g;
    let maximum = -100000000;
    numbers = val.match(number_pattern);
    if (numbers) {
      for (let i = 0; i < numbers.length; i++) {
        numbers[i] = parseInt(numbers[i], 10);
        if (numbers[i] > maximum) {
          maximum = numbers[i];
        }
      }
    }

    font_size = 0;

    while (maximum >= 1) {
      font_size += 1;
      maximum = maximum / 10;
    }

    if (font_size <= 3) {
      font_size = 40;
    } else if (font_size > 3 && font_size <= 4) {
      font_size = 30;
    } else if (font_size > 4 && font_size <= 7) {
      font_size = 20;
    } else if (font_size > 7 && font_size <= 9) {
      font_size = 15;
    } else {
      font_size = 10;
    }
  }
  visualize() {
    this.takeValues();
    //  document.getElementById("input_text").classList.remove("remove");
    if (numbers) {
      let x = this.lis(numbers, numbers.length);
      console.log("ans :", x);
    }
    if (numbers) {
      this.setState({ numbers_array: numbers });
      this.setState({ dp_array: DP_array });
    }
  }
  render() {
    const { numbers_array = [], dp_array = [] } = this.state;
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
          <div className="padding_style">
            <svg
              className="svg"
              viewBox={`0 0 ${numbers.length * 75 + 100} ${
                numbers.length * 75 + 200
              }`}
            >
              <text
                id="input_text"
                x="0"
                y={numbers_array.length * 20 + 35}
                className="remove"
              >
                INPUT
              </text>
              {numbers_array.map((node, nodeidx) => {
                return (
                  <LIS_array
                    key={nodeidx}
                    value={numbers_array[nodeidx]}
                    x1={nodeidx * 75}
                    y1={numbers_array.length * 25 - 15}
                    font={font_size}
                  ></LIS_array>
                );
              })}
              {dp_array.map((node, nodeidx) => {
                return (
                  <LIS_array
                    key={nodeidx}
                    value={dp_array[nodeidx]}
                    x1={nodeidx * 75}
                    y1={numbers.length * 65 + 100}
                    font={font_size}
                  ></LIS_array>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default LIS;
