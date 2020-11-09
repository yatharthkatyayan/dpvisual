import React, { Component } from "react";
import Coins from "./coins_grid";
import SideNav from "./sidenav";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import LCS from "./problems/LCS/LCS";
import LIS from "./problems/LIS/lis";
import homepage from "./start_homepage";
import DpInfo from "./dp_info";
import ContactUs from "./contactUS";

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
              <Link to="/problem/LIS">
                <div className=" homepage_button">
                  Longest Increasing Subsequence
                </div>
              </Link>
            </div>
          </Route>
          <Route path="/problem/LCS" exact component={LCS} />
          <Route path="/problem/coins_change" exact component={Coins} />
          <Route path="/problem/LIS" exact component={LIS} />

          <Route path="/" exact component={homepage} />
          <Route path="/info" exact component={DpInfo} />
          <Route path="/contact" exact component={ContactUs} />
        </Router>
      </div>
    );
  }
}

export default Home;
