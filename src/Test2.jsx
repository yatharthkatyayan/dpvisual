import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

class Test2 extends Component {
  state = {};
  openNav() {
    // console.log("pressed");
    document.getElementById("myNav").style.width = "100vw";
  }

  closeNav() {
    //  console.log("closed");
    let x = document.getElementById("myNav");
    x.style.width = "0%";
  }
  render() {
    return (
      <div className="">
        <div id="myNav" className="overlay fullnav">
          <a
            href="javascript:void(0)"
            className="closebtn"
            onClick={() => this.closeNav()}
          >
            &times;
          </a>
          <div className="overlay-content">
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
          </div>
        </div>

        <div className="fullnav" onClick={() => this.openNav()}>
          &#9776; open
        </div>
      </div>
    );
  }
}

export default Test2;
