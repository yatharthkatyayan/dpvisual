import React, { Component } from "react";
import LIS_array from "./LIS_array";
import "../../App.css";
import LIScurve from "./LIS_SVG";
let toggle = 1;
let numbers = [];
let timeout_array = [];
let font_size = 0;
function toggled() {
  toggle = !toggle;
}
function codeShow() {
  let x = document.getElementById("codeid");
  if (x) {
    x.classList.toggle("active");
  }
  let content = x.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}
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
    let p1x = i * 75 + 35 + 40;
    let p1y = numbers.length * 25 - 15 + 75;
    let p2x = j * 75 + 35 + 40;
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
    let delay_time = 0;
    let delay_curve = 0;
    if (toggle) {
      delay_time = 1000;
      delay_curve = 500;

      if (n) {
        let count = 0;
        let dp = new Array(n);
        DP_array[0].value = 1;
        dp[0] = 1;
        let temp_curve_array = [];
        for (let i = 1; i < n; i++) {
          let maxval = 0;

          let time1 = setTimeout(() => {
            numbers[i].incheck = 1;
            this.setState({ numbers_array: numbers });
          }, delay_time * count + delay_curve);
          timeout_array.push(time1);

          for (let j = 0; j < i; j++) {
            count++;
            time1 = setTimeout(() => {
              numbers[j].incheck = 1;
              this.setState({ numbers_array: numbers });
              DP_array[j].incheck = 1;
              this.setState({ dp_array: DP_array });
              let curve_obj = this.curveSetter(i, j);
              temp_curve_array.push(curve_obj);
              this.setState({ svg_array: temp_curve_array });
            }, count * delay_time);

            timeout_array.push(time1);

            time1 = setTimeout(() => {
              numbers[j].incheck = 0;
              this.setState({ numbers_array: numbers });
              DP_array[j].incheck = 0;
              this.setState({ dp_array: DP_array });
              temp_curve_array.pop();
              this.setState({ svg_array: temp_curve_array });
            }, count * delay_time + delay_curve);

            timeout_array.push(time1);
            if (arr[i].value > arr[j].value) {
              maxval = Math.max(maxval, dp[j]);
            }
          }

          dp[i] = maxval + 1;

          time1 = setTimeout(() => {
            DP_array[i].value = dp[i];
            this.setState({ dp_array: DP_array });
            numbers[i].incheck = 0;
            this.setState({ numbers_array: numbers });
          }, count * delay_time + delay_curve);
          timeout_array.push(time1);
        }
      }
    } else {
      DP_array[0].value = 1;
      for (let i = 0; i < n; i++) {
        DP_array[i].value = 1;
        for (let j = 0; j < i; j++) {
          if (
            arr[i].value > arr[j].value &&
            DP_array[i].value < DP_array[j].value + 1
          ) {
            DP_array[i].value = DP_array[j].value + 1;
          }
        }
      }
      this.setState({ dp_array: DP_array });
    }
    let time2 = setTimeout(() => {
      let lis_seq = new Array(n).fill(-1).map(() => new Array());

      lis_seq[0].push(arr[0]);

      for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
          if (
            arr[i].value > arr[j].value &&
            lis_seq[i].length < lis_seq[j].length + 1
          ) {
            lis_seq[i] = lis_seq[j].slice();
          }
        }

        lis_seq[i].push(arr[i]);
      }

      let max_lis = lis_seq[0].slice();

      for (let i = 0; i < n; i++) {
        if (lis_seq[i].length > max_lis.length) {
          max_lis = lis_seq[i].slice();
        }
      }
      let LIS_ans = [];
      for (let i = 0; i < max_lis.length; i++) {
        numbers[max_lis[i].id].incheck = -1;
        LIS_ans.push(max_lis[i].value);
        if (i != max_lis.length - 1) LIS_ans.push(",");
      }
      if (document.getElementById("LIS_data"))
        document.getElementById("LIS_data").classList.remove("remove");
      this.setState({ LIS_length: max_lis.length });
      this.setState({ LIS_data: LIS_ans });
      this.setState({ numbers_array: numbers });
    }, ((n * (n - 1)) / 2) * delay_time + delay_curve);
    timeout_array.push(time2);
    return DP_array;
  }

  createobj(value, id) {
    return {
      id: id,
      value: value,
      incheck: 0,
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
        numbers[i] = this.createobj(numbers[i], i);
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
    for (let i = 0; i < timeout_array.length; i++) {
      clearTimeout(timeout_array[i]);
    }
    numbers = [];
    this.setState({ numbers_array: numbers });
    font_size = 0;
    this.setState({ dp_array: [] });
    this.setState({ svg_array: [] });

    document.getElementById("LIS_data").classList.add("remove");
  }
  componentDidMount() {
    this.clearScreen();
    toggle = 1;
  }

  visualize() {
    this.clearScreen();
    this.takeValues();

    if (numbers) {
      let dp = this.setArray(numbers.length);
      this.setState({ dp_array: dp });
      this.setState({ numbers_array: numbers });
      let x = 0;
      x = this.lis(numbers, numbers.length, dp);
      this.setState({ dp_array: dp });
    } else {
      this.setState({ dp_array: [] });
      this.setState({ numbers_array: [] });
    }
  }
  render() {
    const {
      numbers_array = [],
      dp_array = [],
      svg_array = [],
      LIS_data = [],
      LIS_length = 0,
    } = this.state;
    return (
      <div className="parent_div">
        <div className="menu">
          <div className=" lcs_prblm">
            <p>
              Find out the longest increasing subsequence(LIS) in a given array.
            </p>
            <p>For example :</p>
            <p>Array : [10,22,9,33,103,50,80]</p>
            <p>LIS : [10,22,33,50,80]</p>
            <p>*NOTE : GREEN NODES ARE BEING COMPARED.</p>
          </div>
          <div>
            <input
              id="Input_1"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="Input Array here"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div className="toggle_check">
            <label>Enable step-by-step animation</label>
            <label className="switch toggle_bar">
              <input
                type="checkbox"
                defaultChecked
                onClick={() => toggled()}
              ></input>
              <div className="slider round "></div>
            </label>
          </div>

          <button
            id="codeid"
            className="collapsible"
            onClick={() => {
              codeShow();
            }}
          >
            View Code
          </button>
          <div className="content code">
            <pre>
              {`
int lis( int arr[], int n )  
{  
  int lis[n]; 
   
  lis[0] = 1;    
  
  /* Compute optimized LIS values in  
     bottom up manner */
  
     for (int i = 1; i < n; i++ ){
    lis[i] = 1; 
    
    for (int j = 0; j < i; j++ ){  

        if ( arr[i] > arr[j] 
          && lis[i] < lis[j] + 1){  
            lis[i] = lis[j] + 1;  
        }

    }

  }
    // Return maximum value in lis[] 
    
    return *max_element(lis, lis+n); 
}  
              `}
            </pre>
          </div>

          <div id="LIS_data" className="lcs_length remove">
            <p>LIS length = {LIS_length}</p>
            <p>LIS subsequence = [{LIS_data}]</p>
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
              viewBox={`0 0 ${numbers_array.length * 75 + 100} ${
                numbers_array.length * 75 + 200
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
                    x1={nodeidx * 75 + 40}
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
                    x1={nodeidx * 75 + 40}
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
          <div className="footer">made by yatharth katyayan</div>
        </div>
      </div>
    );
  }
}

export default LIS;
