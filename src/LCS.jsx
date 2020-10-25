import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import LCSTree from "./LCS_tree";

let treearray = [];
let a = "agbvj";
let b = "gtx";
function node(i, j) {
  return {
    parent: null,
    id: `${i}-${j}`,
    x: 0,
    y: 0,
    left: null,
    right: null,
    str1_idx: i,
    str2_idx: j,
    value: `${i} ${j}`,
  };
}
const parent = node(0, 0);
function fn(i, j, treenode) {
  treearray.push(`${i} ${j}`);
  if (i == a.length || j == b.length) return 0;

  if (a[i] == b[j]) {
    treenode.left = node(i + 1, j + 1);
    return 1 + fn(i + 1, j + 1, treenode.left);
  }
  treenode.left = node(i, j + 1);
  treenode.right = node(i + 1, j);
  return Math.max(fn(i, j + 1, treenode.left), fn(i + 1, j, treenode.right));
}
function traverse(xx, yy, treenode) {
  let x = fn(xx, yy, treenode);
  for (let i = 0; i < treearray.length; i++) {
    console.log(treearray[i]);
  }
  console.log("result", x);
}
function traversetree(treenode) {
  console.log(treenode.value);
  if (treenode.left != null) {
    traversetree(treenode.left);
  }
  if (treenode.right != null) {
    traversetree(treenode.right);
  }
}
class LCS extends Component {
  state = {};
  render() {
    return (
      <div className="input_item">
        <button onClick={() => traverse(0, 0, parent)}>try it normal</button>
        <button onClick={() => traversetree(parent)}>try it treenode</button>
        <div>
          <Link to="/">
            <button className="create_coin_button">HomePage</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default LCS;
