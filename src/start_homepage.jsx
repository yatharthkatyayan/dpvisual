import React, { Component } from "react";
import { Link } from "react-router-dom";
/* <link
  href="https://fonts.googleapis.com/css2?family=Euphoria+Script&display=swap"
  rel="stylesheet"
></link>; */
let greet = [];
let middle1 = [];
let middle2 = [];
let middle3 = [];
let last1 = [];
let last2 = [];
let last3 = [];
let last4 = [];
let last5 = [];
let timeout_array = [];
let time = 100;
class homepage extends Component {
  state = {};

  starter() {
    let time1;
    let gg = "Hi there, I hope you are doing well in these tough times. ";
    for (let i = 0; i < gg.length; i++) {
      time1 = setTimeout(() => {
        greet.push(gg[i]);
        if (document.getElementById("1"))
          document.getElementById("1").scrollIntoView();
        this.setState({ starter: greet });
      }, time * i);
      timeout_array.push(time1);
    }
    time1 = setTimeout(() => {
      this.midder();
    }, time * gg.length + 500);
    timeout_array.push(time1);
  }
  midder() {
    let time1;
    let mid1 =
      "This is my practice project for learning and visualizing 'Dynamic Programming'. ";
    for (let i = 0; i < mid1.length; i++) {
      time1 = setTimeout(() => {
        middle1.push(mid1[i]);
        if (document.getElementById("2"))
          document.getElementById("2").scrollIntoView();
        this.setState({ midder1: middle1 });
      }, time * i);
      timeout_array.push(time1);
    }
    middle2 = [];
    let mid2 = "Ohh.. if you don't know what is 'Dynamic Programming' ....";

    time1 = setTimeout(() => {
      for (let i = 0; i < mid2.length; i++) {
        let time2 = setTimeout(() => {
          middle2.push(mid2[i]);
          if (document.getElementById("3"))
            document.getElementById("3").scrollIntoView();
          this.setState({ midder2: middle2 });
        }, time * i);
        timeout_array.push(time2);
      }
    }, time * mid1.length);

    timeout_array.push(time1);

    middle3 = [];
    let mid3 = "Well... Don't you worry i got your back, just click ";

    time1 = setTimeout(() => {
      for (let i = 0; i < mid3.length; i++) {
        let time2 = setTimeout(() => {
          middle3.push(mid3[i]);
          if (document.getElementById("4"))
            document.getElementById("4").scrollIntoView();
          this.setState({ midder3: middle3 });
        }, time * i);
        timeout_array.push(time2);
      }
    }, time * mid1.length + time * mid2.length);

    timeout_array.push(time1);
    let here = (
      <Link key="unused_key" to="/dpvisual/info" style={{ color: "#2196f3" }}>
        here
      </Link>
    );

    time1 = setTimeout(() => {
      middle3.push(here);
      if (document.getElementById("4"))
        document.getElementById("4").scrollIntoView();
      this.setState({ midder3: middle3 });
    }, time * (mid1.length + mid2.length + mid3.length) + 100);
    timeout_array.push(time1);
    time1 = setTimeout(() => {
      this.laster();
    }, time * (mid1.length + mid2.length + mid3.length) + 3500);
    timeout_array.push(time1);
  }

  laster() {
    let time1;
    let last_1 =
      "Ahh.. you are a pro ... seems like you already know all about 'Dynamic Programming'. ";
    for (let i = 0; i < last_1.length; i++) {
      time1 = setTimeout(() => {
        last1.push(last_1[i]);
        if (document.getElementById("5"))
          document.getElementById("5").scrollIntoView();
        this.setState({ laster1: last1 });
      }, time * i);
      timeout_array.push(time1);
    }
    last2 = [];
    let last_2 =
      "Well, I hope you enjoy this project and learn something new ...";
    let time2 = setTimeout(() => {
      for (let i = 0; i < last_2.length; i++) {
        setTimeout(() => {
          last2.push(last_2[i]);
          if (document.getElementById("6"))
            document.getElementById("6").scrollIntoView();
          this.setState({ laster2: last2 });
        }, time * i);
        timeout_array.push(time1);
      }
    }, last_1.length * time);
    timeout_array.push(time2);
    last3 = [];
    let last_3 = "We will meet soon ...";
    time2 = setTimeout(() => {
      for (let i = 0; i < last_3.length; i++) {
        time1 = setTimeout(() => {
          last3.push(last_3[i]);
          if (document.getElementById("7"))
            document.getElementById("7").scrollIntoView();
          this.setState({ laster3: last3 });
        }, time * i);
        timeout_array.push(time1);
      }
    }, (last_1.length + last_2.length) * time + 2500);
    timeout_array.push(time2);
    last4 = [];
    let last_4 = "With Regards ..";
    time2 = setTimeout(() => {
      for (let i = 0; i < last_4.length; i++) {
        time1 = setTimeout(() => {
          last4.push(last_4[i]);
          if (document.getElementById("8"))
            document.getElementById("8").scrollIntoView();
          this.setState({ laster4: last4 });
        }, time * i);
        timeout_array.push(time1);
      }
    }, (last_1.length + last_2.length + last_3.length) * time + 2500);
    timeout_array.push(time2);
    last5 = [];
    let bye = "- Yatharth Katyayan";
    time2 = setTimeout(() => {
      for (let i = 0; i < bye.length; i++) {
        time1 = setTimeout(() => {
          last5.push(bye[i]);
          if (document.getElementById("9"))
            document.getElementById("9").scrollIntoView();
          this.setState({ laster5: last5 });
        }, time * i);
        timeout_array.push(time1);
      }
    }, (last_1.length + last_2.length + last_3.length + last_4.length) * time + 2500);
    timeout_array.push(time2);
  }
  clear() {
    for (let i = 0; i < timeout_array.length; i++) {
      clearTimeout(timeout_array[i]);
    }
    greet = [];
    middle1 = [];
    middle2 = [];
    middle3 = [];
    last1 = [];
    last2 = [];
    last3 = [];
    last4 = [];
    last5 = [];
    this.setState({ starter: [] });
    this.setState({ midder1: [] });
    this.setState({ midder2: [] });
    this.setState({ midder3: [] });
    this.setState({ laster1: [] });
    this.setState({ laster2: [] });
    this.setState({ laster3: [] });
    this.setState({ laster4: [] });
    this.setState({ laster5: [] });
  }
  componentDidMount() {
    this.clear();
    setTimeout(() => {
      this.starter();
    }, 3000);
  }
  componentWillUnmount() {
    this.clear();
  }

  render() {
    const {
      starter = [],
      midder1 = [],
      midder2 = [],
      midder3 = [],
      laster1 = [],
      laster2 = [],
      laster3 = [],
      laster4 = [],
      laster5 = [],
    } = this.state;
    return (
      <div className="homepage_screen">
        <div id="1" className="home_div">
          {starter}
        </div>
        <div id="2" className="home_div">
          {midder1}
        </div>

        <div id="3" className="home_div">
          {midder2}
        </div>
        <div id="4" className="home_div">
          {midder3}
        </div>
        <div id="5" className="home_div">
          {laster1}
        </div>
        <div id="6" className="home_div">
          {laster2}
        </div>
        <div id="7" className="home_div">
          {laster3}
        </div>
        <div id="8" className="home_div">
          {laster4}
        </div>
        <div id="9" className="home_div">
          {laster5}
        </div>
      </div>
    );
  }
}

export default homepage;
