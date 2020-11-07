import React, { Component } from "react";
import Coins from "./coins_grid";
import SideNav from "./sidenav";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import LCS from "./LCS";

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="line">
        <Router>
          <SideNav />
          <Route path="/problem" exact component={Home}>
            <div className="coin_input ">
              <Link to="/problem/LCS">
                <div className=" homepage_button ">
                  Longest Comman Subsequence
                </div>
              </Link>

              <Link to="/problem/coins_change">
                <div className=" homepage_button">Classical Coin Change</div>
              </Link>
            </div>
          </Route>
          <Route path="/problem/LCS" exact component={LCS} />

          <Route path="/problem/coins_change" exact component={Coins} />
        </Router>
      </div>
    );
  }
}

export default Home;
