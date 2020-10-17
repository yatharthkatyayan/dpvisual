import React, { Component } from "react";
import Coins from "./coins_grid";
import Test1 from "./Test1";
import Test2 from "./Test2";
import { BrowserRouter as Router, Route } from "react-router-dom";
class Home extends Component {
  state = {};
  render() {
    return (
      <Router>
        <div>
          <Route path="/test1" component={Test1} />
          <Route path="/test2" component={Test2} />
          <Route path="/" exact component={Coins} />
        </div>
      </Router>
    );
  }
}

export default Home;
