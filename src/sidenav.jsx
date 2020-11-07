import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

class SideNav extends Component {
  state = {};
  openNav() {
    document.getElementById("myNav").style.width = "100%";
  }

  closeNav() {
    let x = document.getElementById("myNav");
    x.style.width = "0%";
  }
  render() {
    return (
      <div className="navbar">
        <div id="myNav" className="overlay">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <div className="overlay-content">
            <Link to="/HomePage" onClick={() => this.closeNav()}>
              <a href="#">HomePage</a>
            </Link>
            <Link to="/info" onClick={() => this.closeNav()}>
              <a href="#">What is Dynamic Programming(DP)</a>
            </Link>
            <Link to="/problem" onClick={() => this.closeNav()}>
              <a href="#">Visualize Dynamic Programming</a>
            </Link>
            <Link to="/contact" onClick={() => this.closeNav()}>
              <a href="#">Contact us</a>
            </Link>
          </div>
        </div>

        <div className="fullnav" onClick={() => this.openNav()}>
          &#9776; open
        </div>
      </div>
    );
  }
}

export default SideNav;
