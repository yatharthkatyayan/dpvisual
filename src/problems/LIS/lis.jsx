import React, { Component } from "react";
import LIS_array from "./LIS_array";
import "../../App.css";

let numbers = [];
let font_size = 0;
class LIS extends Component {
  state = {};

  setArray(n) {
    let DP_array = new Array(n);
    for (let i = 0; i < n; i++) {
      DP_array[i] = this.createobj(null);
    }
    return DP_array;
  }

  lis(arr, n, DP_array) {
    if (n) {
      let count = 0;
      let dp = new Array(n);
      DP_array[0].value = 1;
      dp[0] = 1;
      for (let i = 1; i < n; i++) {
        let maxval = 0;
      //  console.log("i");
        for (let j = 0; j < i; j++) {
          count++;

          setTimeout(() => {
        //    console.log(j, -i, "c");
            numbers[j].incheck = true;
            this.setState({ numbers_array: numbers });
            DP_array[j].incheck = true;
            this.setState({ dp_array: DP_array });
          }, count * 1000);

          setTimeout(() => {
       //     console.log(j, -i);
            numbers[j].incheck = false;
            this.setState({ numbers_array: numbers });
            DP_array[j].incheck = false;
            this.setState({ dp_array: DP_array });
          }, count * 1000 + 500);

          if (arr[i].value > arr[j].value) {
            maxval = Math.max(maxval, dp[j]);
          }
        
        }
      //  console.log("value :",i,maxval+1);
        dp[i] = maxval+1;
        setTimeout(()=>{
          DP_array[i].value = dp[i];
          this.setState({ dp_array: DP_array });
        },count*1000+500);
      
          
       
      }
      return DP_array;
    }
  }

  createobj(value) {
    return {
      value: value,
      incheck: false,
    };
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
      for (let i = 0; i < numbers.length; i++) {
        numbers[i] = this.createobj(numbers[i]);
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
    //  console.log(this.state.numbers_array, numbers);
    if (numbers) {
      let dp = this.setArray(numbers.length);
      this.setState({ dp_array: dp });
      this.setState({ numbers_array: numbers });
      let x = this.lis(numbers, numbers.length, dp);
      this.setState({ dp_array: dp });
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
                const { value, incheck } = node;
                return (
                  <LIS_array
                    key={nodeidx}
                    value={value}
                    x1={nodeidx * 75}
                    incheck={incheck}
                    y1={numbers_array.length * 25 - 15}
                    font={font_size}
                  ></LIS_array>
                );
              })}
              {dp_array.map((node, nodeidx) => {
                const { value, incheck } = node;
                return (
                  <LIS_array
                    key={nodeidx}
                    incheck={incheck}
                    value={value}
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
