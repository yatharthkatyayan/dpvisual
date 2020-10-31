import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import LCSTree from "./LCS_tree";

let treearray = [];
let nexts = [];
let offset = [];
let a = "anjg";
let b = "gtb";
let pos = 10;
const parent = node(0, 0);
let place = 0;

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
    mod: 0,
    thread: null,
  };
}
/*
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
*/
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
  /*
  let depth = depth_of_tree(parent);

  for (let i = 0; i <= depth; i++) {
    nexts.push(0);
    offset.push(0);
  }
  */
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
  /*
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
  position_teller_3(tree, depth) {
    if (tree.left) {
      this.position_teller_3(tree.left, depth + 1);
    }
    if (tree.right) {
      this.position_teller_3(tree.right, depth + 1);
    }
    tree.y = depth;
    if (tree.left == null && tree.right == null) {
      place = nexts[depth];
      tree.x = place;
    } else if (tree.left && tree.right) {
      place = (tree.left.x + tree.right.x) / 2;
    } else {
      if (tree.left) {
        place = tree.left.x - 1;
      } else {
        place = tree.right.x - 1;
      }
    }
    offset[depth] = Math.max(offset[depth], nexts[depth] - place);
    if (tree.left || tree.right) {
      tree.x = place + offset[depth];
    }
    nexts[depth] += 2;
    tree.mod = offset[depth];
  }
*/
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
      tree.y = temp_tree.y;
      //    console.log("setup 1: ", tree.x); /*-----------------------------------*/
      return tree;
    }
    if (tree.right == null && tree.left != null) {
      let temp_tree = this.setup(tree.left, depth + 1);
      tree.x = temp_tree.x;
      tree.y = temp_tree.y;
      //    console.log("setup 2: ", tree.x); /*-----------------------------------*/
      return tree;
    }
    let left_tree = this.setup(tree.left, depth + 1);
    let right_tree = this.setup(tree.right, depth + 1);

    tree.x = this.fix_subtrees(left_tree, right_tree);
    tree.y = left_tree.y - 1;
    //  console.log("setup 3: ", tree.x); /*-------------------------------------*/
    return tree;
  }

  fix_subtrees(left_tree, right_tree) {
    let hope = this.contour(left_tree, right_tree, 0, 0, 0, null, null);
    let li = hope.li;
    let ri = hope.ri;
    let diff = hope.maxoffset;
    let loffset = hope.loffset;
    let roffset = hope.roffset;
    let lo = hope.left_outer;
    let ro = hope.right_outer;
    //  console.log("hope : ", hope);
    // console.log("contour : ", li, ri, diff, loffset, roffset, lo, ro);
    diff += 1;
    diff += (right_tree.x + diff + left_tree.x) % 2;
    right_tree.mod = diff;
    //  console.log("fix tree mod 1: ", right_tree.mod); /*-----------------------*/
    right_tree.x += diff;
    //  console.log("fix tree x 1: ", right_tree.x); /*--------------------------*/
    if (right_tree.left || right_tree.right) {
      roffset += diff;
    }
    if (ri && !li) {
      if (lo) {
        lo.thread = ri;
        lo.mod = roffset - loffset;
        //    console.log("fix tree mod 2: ", lo.mod); /*--------------------------*/
      }
    } else if (li && !ri) {
      if (ro) {
        ro.thread = li;
        ro.mod = loffset - roffset;
        //    console.log("fix tree mod 2: ", ro.mod); /*--------------------------*/
      }
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
    /* this.position_teller_1(parent, 0);
     this.position_teller_2(parent, 0);
     this.position_teller_3(parent, 0);
     this.addmod(parent, 0);  */
    this.layout(parent);
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
