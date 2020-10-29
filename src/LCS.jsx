import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import LCSTree from "./LCS_tree";

let treearray = [];
let nexts = [];
let a = "agbvj";
let b = "gtx";
let pos = 10;
const parent = node(0, 0);

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

function depth_of_tree(treenode) {
  if (treenode.left == null && treenode.right == null) {
    return 0;
  } else {
    let lDepth = 0;
    let rDepth = 0;
    if (treenode.left) {
      lDepth = depth_of_tree(treenode.left);
    }
    if (treenode.right) {
      rDepth = depth_of_tree(treenode.right);
    }
    if (lDepth > rDepth) {
      return lDepth + 1;
    } else {
      return rDepth + 1;
    }
  }
}

function fn(i, j, treenode) {
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
  traversetree(parent);
  let depth = depth_of_tree(parent);

  for (let i = 0; i <= depth; i++) {
    nexts.push(0);
  }
}

function traversetree(treenode) {
  treearray.push(treenode);
  // console.log(treearray[treearray.length - 1].value);
  if (treenode.left != null) {
    traversetree(treenode.left);
  }
  if (treenode.right != null) {
    traversetree(treenode.right);
  }
}

class LCS extends Component {
  state = {};

  position_teller_1(tree, depth) {
    if (tree.left != null) {
      this.position_teller_1(tree.left, depth + 75);
    }
    tree.x = pos;
    tree.y = depth;
    pos += 20;
    if (tree.right != null) {
      this.position_teller_1(tree.right, depth + 75);
    }
  }
  position_teller_2(tree, depth) {
    tree.x = nexts[depth];
    tree.y = depth;
    nexts[depth] += 50;
    if (tree.left != null) {
      this.position_teller_2(tree.left, depth + 1);
    }
    if (tree.right != null) {
      this.position_teller_2(tree.right, depth + 1);
    }
  }
  help() {
    traverse(0, 0, parent);
    // this.position_teller_1(parent, 0);
    this.position_teller_2(parent, 0);
    this.setState({ nodes: treearray });
  }

  render() {
    const { nodes = [] } = this.state;
    return (
      <div className="input_item">
        <button onClick={() => this.help()}>normal</button>
        <div className="hope">
          {nodes.map((node, nodeidx) => {
            const {
              parent,
              id,
              x,
              y,
              left,
              right,
              str1_idx,
              str2_idx,
              value,
            } = node;
            return (
              <LCSTree
                key={nodeidx}
                parent={parent}
                id={id}
                x={x}
                y={y}
                left={left}
                right={right}
                str1_idx={str1_idx}
                str2_idx={str2_idx}
                value={value}
              >
                {value}
              </LCSTree>
            );
          })}
        </div>
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
