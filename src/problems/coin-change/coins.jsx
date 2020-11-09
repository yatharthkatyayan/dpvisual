import React, { Component } from "react";
import "../../App.css";
class CoinDiv extends Component {
  state = {};
  render() {
    const {
      value,
      id,
      reachable,
      isvisited,
      coin_values,
      onClick,
    } = this.props;
    let classes = "coin-color";
    if (isvisited == 1) {
      if (reachable) {
        classes = "coinreachable";
      } else {
        classes = "coinunreachable";
      }
    } else if (isvisited == 2) {
      if (reachable) {
        classes = "coinreachable_done";
      } else {
        classes = "coinunreachable_done";
      }
    }
    return (
      <div
        id={id}
        value={value}
        className={`coin  ${classes}`}
        coin_values={coin_values}
        onClick={() => onClick()}
      >
        {value}
      </div>
    );
  }
}

export default CoinDiv;
