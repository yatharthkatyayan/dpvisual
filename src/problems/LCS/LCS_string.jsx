import React, { Component } from "react";
class LCS_string extends Component {
  state = {};
  render() {
    const { id, value, check } = this.props;
    return (
      <div id={id} check={check}>
        {value}
      </div>
    );
  }
}

export default LCS_string;
