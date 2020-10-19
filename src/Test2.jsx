import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

class Test2 extends Component {
  state = {};
  render() {
    return (
      <div className="input_item">
        <h1>test2</h1>
        <div>
          <Link to="/">
            <button className="create_coin_button">HomePage</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Test2;
