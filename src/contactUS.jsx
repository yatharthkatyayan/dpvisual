import React, { Component } from "react";
import { GoMarkGithub } from "react-icons/go";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

class ContactUs extends Component {
  state = {};
  render() {
    return (
      <div className="icon_div">
        <div className=" coin_input">
          <a href="#" style={{ color: "black" }} className="icon">
            <GoMarkGithub />
          </a>
          <a href="#" style={{ color: "black" }} className="icon">
            <AiFillLinkedin />
          </a>
          <a href="#" style={{ color: "black" }} className="icon">
            <AiFillInstagram />
          </a>
        </div>
      </div>
    );
  }
}

export default ContactUs;
