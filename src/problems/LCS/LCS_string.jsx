import React, { Component } from "react";
class LCS_string extends Component {
  state = {};
  render() {
    const { id, value, check } = this.props;
    let temp_color = "black";
    if (check == -1) {
      temp_color = "#2196f3";
    } else if (check == 2) {
      temp_color = "red";
    }
    return (
      <div
        className="string_font"
        id={id}
        check={check}
        style={{ color: `${temp_color}` }}
      >
        {value}
      </div>
    );
  }
}

export default LCS_string;
