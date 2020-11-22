import React, { Component } from "react";
import Coins from "./problems/coin-change/coins_grid";
import SideNav from "./sidenav";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import LCS from "./problems/LCS/LCS";
import LIS from "./problems/LIS/LIS";
import homepage from "./start_homepage";
import DpInfo from "./dp_info";
import ContactUs from "./contactUS";
import ED from "./problems/ED/ED";
import KS from "./problems/01KS/01_KS";

class Home extends Component {
  state = {};

  render() {
    return (
      <div className="line">
        <Router>
          <SideNav />
          <Route path="/dpvisual/problem" exact component={Home}>
            <div className="coin_input ">
              <Link to="/dpvisual/problem/LCS">
                <div className=" homepage_button ">
                  Longest Comman Subsequence
                </div>
              </Link>

              <Link to="/dpvisual/problem/LIS">
                <div className=" homepage_button">
                  Longest Increasing Subsequence
                </div>
              </Link>
              <Link to="/dpvisual/problem/ED">
                <div className=" homepage_button">Edit Distance</div>
              </Link>
              <Link to="/dpvisual/problem/KS">
                <div className=" homepage_button">0-1 Knapsack</div>
              </Link>

              <Link to="/dpvisual/problem/coins_change">
                <div className=" homepage_button">Classical Coin Change</div>
              </Link>
            </div>
          </Route>
          <Route path="/dpvisual/problem/LCS" exact component={LCS} />
          <Route
            path="/dpvisual/problem/coins_change"
            exact
            component={Coins}
          />
          <Route path="/dpvisual/problem/LIS" exact component={LIS} />
          <Route path="/dpvisual/problem/ED" exact component={ED} />
          <Route path="/dpvisual/problem/KS" exact component={KS} />

          <Route path="/dpvisual" exact component={homepage} />
          <Route path="/dpvisual/info" exact component={DpInfo} />
          <Route path="/dpvisual/contact" exact component={ContactUs} />
        </Router>
      </div>
    );
  }
}

export default Home;
