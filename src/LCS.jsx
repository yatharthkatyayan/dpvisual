import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import LCSTree from "./LCS_tree";

let treearray = [];
let a = "am";
let b = "bj";
let pos = 10;
const parent = node(0, 0);
let x_place = 0;
let y_place = 0;

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
    value: `${i},${j}`,
    mod: 0,
    thread: null,
  };
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
}

function traversetree(treenode) {
  treearray.push(treenode);

  if (treenode.left != null) {
    traversetree(treenode.left);
  }
  if (treenode.right != null) {
    traversetree(treenode.right);
  }
}

class LCS extends Component {
  state = {};
  nextright(tree) {
    if (tree.thread) {
      return tree.thread;
    }
    if (tree.left || tree.right) {
      if (tree.right) {
        return tree.right;
      } else {
        return tree.left;
      }
    } else {
      return null;
    }
  }

  nextleft(tree) {
    if (tree.thread) {
      return tree.thread;
    }
    if (tree.left || tree.right) {
      if (tree.left) {
        return tree.left;
      } else {
        return tree.right;
      }
    } else {
      return null;
    }
  }

  addmod(tree, modsum = 0) {
    tree.x = tree.x + modsum;
    x_place = Math.max(x_place, tree.x);
    y_place = Math.max(y_place, tree.y);
    if (tree.left) {
      this.addmod(tree.left, modsum + tree.mod);
    }
    if (tree.right) {
      this.addmod(tree.right, modsum + tree.mod);
    }
    return tree;
  }

  layout(tree) {
    return this.addmod(this.setup(tree, 0), 0);
  }

  setup(tree, depth) {
    if (tree.left == null && tree.right == null) {
      tree.x = 0;
      tree.y = depth;

      return tree;
    }
    if (tree.left == null && tree.right != null) {
      let temp_tree = this.setup(tree.right, depth + 1);
      tree.x = temp_tree.x;
      tree.y = temp_tree.y - 1;

      return tree;
    }
    if (tree.right == null && tree.left != null) {
      let temp_tree = this.setup(tree.left, depth + 1);
      tree.x = temp_tree.x;
      tree.y = temp_tree.y - 1;

      return tree;
    }
    let left_tree = this.setup(tree.left, depth + 1);
    let right_tree = this.setup(tree.right, depth + 1);

    tree.x = this.fix_subtrees(left_tree, right_tree);
    tree.y = left_tree.y - 1;

    return tree;
  }

  fix_subtrees(left_tree, right_tree) {
    let hope = this.contour(left_tree, right_tree, null, 0, 0, null, null);
    let li = hope.li;
    let ri = hope.ri;
    let diff = hope.maxoffset;
    let loffset = hope.loffset;
    let roffset = hope.roffset;
    let lo = hope.left_outer;
    let ro = hope.right_outer;

    diff += 1;

    right_tree.mod += diff;

    right_tree.x += diff;

    if (right_tree.left || right_tree.right) {
      roffset += diff;
    }
    if (ri && !li) {
      lo.thread = ri;
      lo.mod = roffset - loffset;
    } else if (li && !ri) {
      ro.thread = li;
      ro.mod = loffset - roffset;
    }
    return (left_tree.x + right_tree.x) / 2;
  }

  contour(
    left_tree,
    right_tree,
    maxoffset,
    loffset,
    roffset,
    left_outer = null,
    right_outer = null
  ) {
    let delta = left_tree.x + loffset - (right_tree.x + roffset) + 1;
    if (!maxoffset || delta > maxoffset) {
      maxoffset = delta;
    }
    if (!left_outer) {
      left_outer = left_tree;
    }
    if (!right_outer) {
      right_outer = right_tree;
    }
    let lo = this.nextleft(left_outer || left_tree);
    let li = this.nextright(left_tree || left_outer);
    let ri = this.nextleft(right_tree || right_outer);
    let ro = this.nextright(right_outer || right_tree);

    if (li && ri) {
      loffset += left_tree.mod;
      roffset += right_tree.mod;
      return this.contour(li, ri, maxoffset, loffset, roffset, lo, ro);
    }

    return { li, ri, maxoffset, loffset, roffset, left_outer, right_outer };
  }

  help() {
    traverse(0, 0, parent);

    this.layout(parent);

    this.setState({ nodes: treearray });
    console.log("x_place : ", x_place);
    console.log("y_place : ", y_place);
  }

  render() {
    const { nodes = [] } = this.state;
    return (
      <div>
        <div className="menu">
          <div className="lcs-visual">
            <div onClick={() => this.help()}>Visualize</div>
          </div>
          <div>
            <Link to="/">
              <button className="create_coin_button">HomePage</button>
            </Link>
          </div>
        </div>
        <div className="hope">
          <svg
            width="100%"
            height={`${window.innerHeight}`}
            viewBox={`0 0 ${x_place * 85 + 100} ${y_place * 150 + 100}`}
          >
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
                mod,
                thread,
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
                  mod={mod}
                  thread={thread}
                >
                  {value}
                </LCSTree>
              );
            })}
          </svg>
        </div>
      </div>
    );
  }
}

export default LCS;
