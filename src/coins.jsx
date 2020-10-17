import React, { Component } from "react";
import "./App.css";
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
    if (isvisited) {
      if (reachable) {
        classes = "coinreachable";
      } else {
        classes = "coinunreachable";
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
