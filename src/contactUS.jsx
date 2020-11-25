import React, { Component } from "react";
import { GoMarkGithub } from "react-icons/go";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

class ContactUs extends Component {
  state = {};
  render() {
    return (
      <div className="icon_div">
        <div className=" icon_center">
          <a
            href="https://github.com/yatharthkatyayan"
            style={{ color: "black" }}
            className="icon"
          >
            <GoMarkGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/yatharth-katyayan-46a297185/?originalSubdomain=in"
            style={{ color: "black" }}
            className="icon"
          >
            <AiFillLinkedin />
          </a>
          <a
            href="https://www.instagram.com/i_know_u_r_stupid_but_still_i_"
            style={{ color: "black" }}
            className="icon"
          >
            <AiFillInstagram />
          </a>
        </div>
      </div>
    );
  }
}

export default ContactUs;
