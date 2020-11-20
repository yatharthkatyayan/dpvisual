import React, { Component } from "react";
import LIS_array from "./LIS_array";
import "../../App.css";
import LIScurve from "./LIS_SVG";

let numbers = [];
let timeout_array = [];
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

  curveSetter(i, j) {
    let p1x = i * 75 + 35;
    let p1y = numbers.length * 25 - 15 + 75;
    let p2x = j * 75 + 35;
    let p2y = p1y;

    let midpx = (p2x + p1x) * 0.5;
    let midpy = (p2y + p1y) * 0.5;

    let theta = Math.atan2(p2y - p1y, p2x - p1x) - Math.PI / 2;
    let offset = 60;

    let c1x = midpx + offset * Math.cos(theta);
    let c1y = midpy + offset * Math.sin(theta);
    //  let curve = `M${p1x} ${p1y} Q ${c1x} ${c1y} ${p2x} ${p2y}`;
    let curve =
      "M" + p1x + " " + p1y + " Q " + c1x + " " + c1y + " " + p2x + " " + p2y;
    let comp = 0;
    if (numbers[i].value > numbers[j].value) {
      comp = 1;
    } else if (numbers[i].value < numbers[j].value) {
      comp = -1;
    }
    return { curve: curve, midpx: c1x, midpy: c1y, comp: comp };
  }

  lis(arr, n, DP_array) {
    if (n) {
      let count = 0;
      let dp = new Array(n);
      DP_array[0].value = 1;
      dp[0] = 1;
      let temp_curve_array = [];
      for (let i = 1; i < n; i++) {
        let maxval = 0;

        let time1 = setTimeout(() => {
          numbers[i].incheck = true;
          this.setState({ numbers_array: numbers });
        }, 1000 * count + 500);
        timeout_array.push(time1);
        for (let j = 0; j < i; j++) {
          count++;

          time1 = setTimeout(() => {
            numbers[j].incheck = true;
            this.setState({ numbers_array: numbers });
            DP_array[j].incheck = true;
            this.setState({ dp_array: DP_array });
            let curve_obj = this.curveSetter(i, j);

            temp_curve_array.push(curve_obj);
            console.log(curve_obj.curve);
            console.log("comp :", curve_obj.comp);
            this.setState({ svg_array: temp_curve_array });
          }, count * 1000);
          timeout_array.push(time1);
          time1 = setTimeout(() => {
            numbers[j].incheck = false;
            this.setState({ numbers_array: numbers });
            DP_array[j].incheck = false;
            this.setState({ dp_array: DP_array });
            temp_curve_array.pop();
            this.setState({ svg_array: temp_curve_array });
          }, count * 1000 + 500);
          timeout_array.push(time1);
          if (arr[i].value > arr[j].value) {
            maxval = Math.max(maxval, dp[j]);
          }
        }

        dp[i] = maxval + 1;
        time1 = setTimeout(() => {
          DP_array[i].value = dp[i];
          this.setState({ dp_array: DP_array });
          numbers[i].incheck = false;
          this.setState({ numbers_array: numbers });
        }, count * 1000 + 500);
        timeout_array.push(time1);
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

  clearScreen() {
    numbers = [];
    this.setState({ numbers_array: numbers });
    font_size = 0;
    this.setState({ dp_array: [] });
    this.setState({ svg_array: [] });
    for (let i = 0; i < timeout_array.length; i++) {
      clearTimeout(timeout_array[i]);
    }
  }
  componentDidMount() {
    this.clearScreen();
  }
  visualize() {
    this.clearScreen();
    this.takeValues();

    if (numbers) {
      let dp = this.setArray(numbers.length);
      this.setState({ dp_array: dp });
      this.setState({ numbers_array: numbers });
      let x = this.lis(numbers, numbers.length, dp);
      this.setState({ dp_array: dp });
    }
  }
  render() {
    const { numbers_array = [], dp_array = [], svg_array = [] } = this.state;
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
              {svg_array.map((node, nodeidx) => {
                const { curve, midpx, midpy, comp } = node;
                return (
                  <LIScurve
                    key={nodeidx}
                    midpx={midpx}
                    midpy={midpy}
                    curve={curve}
                    font={font_size}
                    check={comp}
                  ></LIScurve>
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
