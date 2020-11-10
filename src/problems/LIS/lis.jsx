import React, { Component } from "react";
class LIS extends Component {
  state = {};
  takeValues() {
    let val = document.getElementById("Input_1").value;
    let number_pattern = /\d+/g;
    let numbers = val.match(number_pattern);
    if (numbers) {
      for (let i = 0; i < numbers.length; i++) {
        numbers[i] = parseInt(numbers[i], 10);
      }
    }
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
            <button className="lcs-visual" onClick={() => this.takeValues()}>
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
