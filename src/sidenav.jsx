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
      <div className="navbar ">
        <div id="myNav" className="overlay">
          <div
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </div>
          <div className="overlay-content">
            <Link to="/dpvisual" onClick={() => this.closeNav()}>
              <div href="#">HomePage</div>
            </Link>
            <Link to="/dpvisual/info" onClick={() => this.closeNav()}>
              <div href="#">What is Dynamic Programming(DP)</div>
            </Link>
            <Link to="/dpvisual/problem" onClick={() => this.closeNav()}>
              <div href="#">Visualize Dynamic Programming</div>
            </Link>
            <Link to="/dpvisual/contact" onClick={() => this.closeNav()}>
              <div href="#">Connect to me</div>
            </Link>
          </div>
        </div>

        <div
          style={{ fontSize: "50px", cursor: "pointer" }}
          onClick={() => this.openNav()}
        >
          &#9776;{" "}
        </div>
      </div>
    );
  }
}

export default SideNav;
