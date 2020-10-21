import React, { Component } from "react";
import Coins from "./coins_grid";

import Test2 from "./Test2";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import LCS from "./LCS";

class Home extends Component {
  state = {};

  render() {
    return (
      <div>
        <Router>
          <Route path="/" exact component={Home}>
            <div className="coin_input ">
              <Link to="/LCS">
                <div className=" homepage_button ">
                  Longest Comman Subsequence
                </div>
              </Link>

              <Link to="/test2">
                <div className=" homepage_button ">test2</div>
              </Link>

              <Link to="/coins_grid">
                <div className=" homepage_button">Classical Coin Change</div>
              </Link>
            </div>
          </Route>
          <Route path="/LCS" exact component={LCS} />
          <Route path="/test2" exact component={Test2} />
          <Route path="/coins_grid" exact component={Coins} />
        </Router>
      </div>
    );
  }
}

export default Home;
