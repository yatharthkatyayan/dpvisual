import React, { Component } from "react";
import "./App.css";
import CoinDiv from "./coins";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

//let total_coins = 10;
let timeoutArray = [];
function coinMaker_all(total_coins) {
  let coinArray = [];
  for (let i = 0; i <= total_coins; i++) {
    coinArray.push(coin1(i));
  }
  return coinArray;
}
function coinMaker_given(coin_array) {
  let coinArray = [];
  for (let i = 0; i < coin_array.length; i++) {
    coinArray.push(coin2(coin_array[i]));
  }
  return coinArray;
}
function coin1(value) {
  return {
    value: value,
    coin_values: [],
    id: `coin1-${value}`,
    reachable: false,
    isvisited: false,
  };
}
function coin2(value) {
  return {
    value: value,
    coin_values: [],
    id: `coin2-${value}`,
    reachable: false,
    isvisited: false,
  };
}
class Coins extends Component {
  constructor() {
    super();
    this.state = {
      coinArray: [],
      coin_we_have: [],
    };
  }
  details(idx, coinArray) {
    let x = coinArray[idx];
    let temp = [];
    for (let i = 0; i < x.coin_values.length; i++) {
      temp.push(x.coin_values[i]);
      if (i != x.coin_values.length - 1) {
        temp.push(",");
      }
    }
    this.setState({ coin_combo: temp });
    console.log(x.coin_values);
  }
  visualize(coinArray, coin_we_have) {
    coinArray[0].isvisited = true;
    coinArray[0].reachable = true;

    for (let i = 0; i < coinArray.length; i++) {
      for (let j = 0; j < coin_we_have.length; j++) {
        if (coinArray[i].value - coin_we_have[j].value >= 0) {
          coinArray[i].reachable =
            coinArray[coinArray[i].value - coin_we_have[j].value].reachable;
          let x = coinArray[coinArray[i].value - coin_we_have[j].value];

          let myvar = setTimeout(() => {
            x.isvisited = false;
            this.setState({ coinArray });
          }, 500 * i);
          timeoutArray.push(myvar);
          myvar = setTimeout(() => {
            const node = coinArray[coinArray[i].value - coin_we_have[j].value];
            document
              .getElementById(`${node.id}`)
              .classList.remove("coin-color");
            document.getElementById(`${node.id}`).classList.add("visited");
            const node1 = coin_we_have[j];
            document
              .getElementById(`${node1.id}`)
              .classList.remove("coin-color");
            document.getElementById(`${node1.id}`).classList.add("visited");
          }, 500 * i);
          timeoutArray.push(myvar);
          this.setState({ coinArray });

          myvar = setTimeout(() => {
            const node = coinArray[coinArray[i].value - coin_we_have[j].value];
            document.getElementById(`${node.id}`).classList.remove("visited");
            const node1 = coin_we_have[j];
            document.getElementById(`${node1.id}`).classList.remove("visited");
            document.getElementById(`${node1.id}`).classList.add("coin-color");
          }, 500 * i + 500);
          timeoutArray.push(myvar);
          this.setState({ coinArray });

          myvar = setTimeout(() => {
            x.isvisited = true;
            this.setState({ coinArray });
          }, 500 * i + 500);
          timeoutArray.push(myvar);
          if (coinArray[i].reachable) {
            let hope =
              coinArray[coinArray[i].value - coin_we_have[j].value].coin_values;

            let hope1 = hope.slice();
            hope1.push(coin_we_have[j].value);
            coinArray[i].coin_values = hope1;
            break;
          }
        }
      }

      let myvar = setTimeout(() => {
        coinArray[i].isvisited = true;
        this.setState({ coinArray });
      }, 500 * i + 600);
      timeoutArray.push(myvar);
    }
  }
  /*

*/
  setCoin() {
    /*----------------------input 1--------------------------------*/
    let x = document.getElementById("input_number_1").value;
    if (x === "") {
      let z = document.getElementById("input_number_1");
      z.style.borderColor = "red";
      let y = document.getElementById("input_number_1");
      y.classList.add("danger");
      let text = "this field is required";
      this.setState({ placeholder_1: text });
      let ele = document.getElementById("input_number_1");
      ele.value = "";
    } else if (x < 0) {
      let z = document.getElementById("input_number_1");
      z.style.borderColor = "red";
      let y = document.getElementById("input_number_1");
      y.classList.add("danger");
      let text = "value must be a positive number";
      this.setState({ placeholder_1: text });
      let ele = document.getElementById("input_number_1");
      ele.value = "";
    } else if (x > 100) {
      let z = document.getElementById("input_number_1");
      z.style.borderColor = "red";
      let y = document.getElementById("input_number_1");
      y.classList.add("danger");
      let text = "value should be less than 100";
      this.setState({ placeholder_1: text });
      let ele = document.getElementById("input_number_1");
      ele.value = "";
    } else {
      /*-----------------------input 2---------------------------------*/
      let val = document.getElementById("input_number_2").value;
      let number_pattern = /\d+/g;
      let hope = val.match(number_pattern);
      if (hope === null) {
        let temp = document.getElementById("input_number_2");
        temp.classList.add("danger");
        temp.style.borderColor = "red";
        this.setState({ placeholder_2: "invalid values" });
      } else {
        for (let i = 0; i < hope.length; i++) {
          hope[i] = parseInt(hope[i], 10);
        }
        hope.sort(function (a, b) {
          return a - b;
        });
        let new_hope = coinMaker_given(hope);
        this.setState({ coin_we_have: new_hope });
        this.setState({
          placeholder_2:
            "enter values of coins you have seperated by comma (,)",
        });
        //  console.log(new_hope, hope);

        this.setState({ coin_taker: <div></div> });
        let remover = document.getElementById("back_button");
        remover.classList.remove("remove");
        remover = document.getElementById("visualize_button");
        remover.classList.remove("remove");
        remover = document.getElementById("color_helper");
        remover.classList.remove("remove");
        let coin_Array = coinMaker_all(x);
        this.setState({ coinArray: coin_Array });
        this.setState({
          placeholder_1: "enter coin value you want to check",
        });
      }
    }
  }

  clearCoins() {
    for (let i = 0; i < timeoutArray.length; i++) {
      clearTimeout(timeoutArray[i]);
    }
    this.setState({ coinArray: [] });
    this.setState({ coin_we_have: [] });
    let remover = document.getElementById("back_button");
    remover.classList.add("remove");
    remover = document.getElementById("visualize_button");
    remover.classList.add("remove");
    remover = document.getElementById("color_helper");
    remover.classList.add("remove");
    let x = (
      <div id="coin_input" className="coin_input">
        <div className="input_item">
          <input
            className="input_field_size"
            type="number"
            required={true}
            id="input_number_1"
            placeholder="enter coin value you want to check"
          ></input>
        </div>
        <div className="input_item">
          <input
            className="input_field_size"
            type="text"
            required={true}
            id="input_number_2"
            placeholder="enter values of coins you have seperated by comma (,)"
          ></input>
        </div>
        <div className="input_item">
          <button onClick={() => this.setCoin()} className="create_coin_button">
            <b>create coins</b>
          </button>
          <div className="input_item">
            <Link to="/">
              <button className="create_coin_button marginer">
                <b>HomePage</b>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
    this.setState({ coin_taker: x });
  }
  render() {
    const {
      coinArray = [],
      placeholder_1 = "enter coin value you want to check",
      placeholder_2 = "enter values of coins you have seperated by comma (,)",
      coin_taker = (
        <div id="coin_input" className="coin_input">
          <div className="input_item">
            <input
              className="input_field_size"
              type="number"
              required
              id="input_number_1"
              placeholder={placeholder_1}
            ></input>
          </div>
          <div className="input_item">
            <input
              className="input_field_size"
              type="text"
              required
              id="input_number_2"
              placeholder={placeholder_2}
            ></input>
          </div>
          <div className="input_item">
            <button
              onClick={() => this.setCoin()}
              className="create_coin_button"
            >
              <b> create coins</b>
            </button>
          </div>
          <div className="input_item">
            <Link to="/">
              <button className="create_coin_button marginer">
                <b>HomePage</b>
              </button>
            </Link>
          </div>
        </div>
      ),
      coin_we_have = [],
      coin_combo = [],
    } = this.state;

    return (
      <div>
        <div className="problem">
          <p>
            <h1> PROBLEM STATEMENT :-</h1>
            <h2>
              Given an unlimited supply of coins of given denominations, find if
              it is possible to the desired change(sum) from these coins.
            </h2>
          </p>
        </div>
        <div className="problem remove" id="color_helper">
          <div className="coin visited marginer row"></div>
          <div className="row square rightgap">
            <h1>= visited</h1>
          </div>
          <div className="coin coinreachable marginer row"></div>
          <div className="row square rightgap">
            <h1>= reachable</h1>
          </div>
          <div className="coin coinunreachable marginer row"></div>
          <div className="row square rightgap">
            <h1>= unreachable</h1>
          </div>
          <div className="coin coin-color marginer row"></div>
          <div className="row square rightgap">
            <h1>= unchecked</h1>
          </div>
          <div>
            <h1>Possible coin combinational sum = [{this.state.coin_combo}]</h1>
          </div>
        </div>
        <div className="next">
          {coinArray.map((idx, valueidx) => {
            const { coin_values, value, id, reachable, isvisited } = idx;
            return (
              <div className="row padder">
                <CoinDiv
                  key={valueidx}
                  coin_values={coin_values}
                  id={id}
                  value={value}
                  reachable={reachable}
                  isvisited={isvisited}
                  onClick={() => this.details(idx.value, coinArray)}
                >
                  {value}
                </CoinDiv>
              </div>
            );
          })}
        </div>
        <div className="next">
          {coin_we_have.map((idx, valueidx) => {
            const { coin_values, value, id, reachable, isvisited } = idx;
            return (
              <div className="row padder">
                <CoinDiv
                  key={valueidx}
                  coin_values={coin_values}
                  id={id}
                  value={value}
                  reachable={reachable}
                  isvisited={isvisited}
                  onClick={() => this.details(idx.value, coinArray)}
                >
                  {value}
                </CoinDiv>
              </div>
            );
          })}
        </div>
        <div className="next">{coin_taker}</div>

        <div className="next">
          <div className="button_div">
            <button
              onClick={() =>
                this.visualize(this.state.coinArray, this.state.coin_we_have)
              }
              id="visualize_button"
              className="remove visualize_button"
            >
              <b>visualize</b>
            </button>
          </div>
          <div className="button_div">
            <button
              onClick={() => this.clearCoins()}
              id="back_button"
              className="remove back_button"
            >
              <b> Back</b>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Coins;
