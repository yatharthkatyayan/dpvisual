import React, { Component } from "react";
import EDTree from "./ED_tree";
import EDEdges from "./ED_edges";

let treearray = [];
let treeEdge = [];
let fullrec = [];
let str1 = "";
let str2 = "";
let timeout_array = [];
let pos = 10;

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
    middle: null,
    str1_idx: i,
    str2_idx: j,
    value: `${i},${j}`,
    mod: 0,
    thread: null,
    returned_value: -1,
    calculated: false,
  };
}

function edge(parent, child) {
  let slope = 0;
  if (parent && child) {
    slope =
      (parent.y * 150 + 50 - (child.y * 150 + 50)) /
      (parent.x * 45 + 50 - (child.x * 45 + 50));
    if (parent.left == child || parent.right == child) {
      /* parent to child*/

      if (parent.x != child.x && parent.left === child) {
        let temp_x2 = 44 / Math.sqrt(1 + slope * slope) + (child.x * 45 + 50);
        let temp_y2 =
          (44 * slope) / Math.sqrt(1 + slope * slope) + (child.y * 150 + 50);
        let temp_x1 = -35 / Math.sqrt(1 + slope * slope) + (parent.x * 45 + 50);
        let temp_y1 =
          (-35 * slope) / Math.sqrt(1 + slope * slope) + (parent.y * 150 + 50);

        return {
          id: `${temp_x1} ${temp_y1} ${temp_x2} ${temp_y2}`,
          x1: temp_x1,
          y1: temp_y1,
          x2: temp_x2,
          y2: temp_y2,
          value: -1,
          time: 0,
        };
      } else if (parent.x != child.x && parent.right === child) {
        let temp_x2 = -44 / Math.sqrt(1 + slope * slope) + (child.x * 45 + 50);
        let temp_y2 =
          (-44 * slope) / Math.sqrt(1 + slope * slope) + (child.y * 150 + 50);
        let temp_x1 = 35 / Math.sqrt(1 + slope * slope) + (parent.x * 45 + 50);
        let temp_y1 =
          (35 * slope) / Math.sqrt(1 + slope * slope) + (parent.y * 150 + 50);

        return {
          id: `${temp_x1} ${temp_y1} ${temp_x2} ${temp_y2}`,
          x1: temp_x1,
          y1: temp_y1,
          x2: temp_x2,
          y2: temp_y2,
          value: -1,
          time: 0,
        };
      } else {
        return {
          id: `${parent.x * 45 + 50} ${parent.y * 150 + 50 + 35} ${
            child.x * 45 + 50
          } ${child.y * 150 + 50 - 44}`,
          x1: parent.x * 45 + 50,
          y1: parent.y * 150 + 50 + 35,
          x2: child.x * 45 + 50,
          y2: child.y * 150 + 50 - 44,
          value: -1,
          time: 0,
        };
      }
    } else {
      /* child to parent*/

      if (parent.x != child.x && child.left === parent) {
        let temp_x2 = -44 / Math.sqrt(1 + slope * slope) + (child.x * 45 + 50);
        let temp_y2 =
          (-44 * slope) / Math.sqrt(1 + slope * slope) + (child.y * 150 + 50);
        let temp_x1 = 35 / Math.sqrt(1 + slope * slope) + (parent.x * 45 + 50);
        let temp_y1 =
          (35 * slope) / Math.sqrt(1 + slope * slope) + (parent.y * 150 + 50);

        return {
          id: `${temp_x1} ${temp_y1} ${temp_x2} ${temp_y2}`,
          x1: temp_x1,
          y1: temp_y1,
          x2: temp_x2,
          y2: temp_y2,
          value: parent.returned_value,
          time: 0,
        };
      } else if (parent.x != child.x && child.right === parent) {
        let temp_x2 = 44 / Math.sqrt(1 + slope * slope) + (child.x * 45 + 50);
        let temp_y2 =
          (44 * slope) / Math.sqrt(1 + slope * slope) + (child.y * 150 + 50);
        let temp_x1 = -35 / Math.sqrt(1 + slope * slope) + (parent.x * 45 + 50);
        let temp_y1 =
          (-35 * slope) / Math.sqrt(1 + slope * slope) + (parent.y * 150 + 50);

        return {
          id: `${temp_x1} ${temp_y1} ${temp_x2} ${temp_y2}`,
          x1: temp_x1,
          y1: temp_y1,
          x2: temp_x2,
          y2: temp_y2,
          value: parent.returned_value,
          time: 0,
        };
      } else {
        return {
          id: `${parent.x * 45 + 50} ${parent.y * 150 + 50 + 35} ${
            child.x * 45 + 50
          } ${child.y * 150 + 50 - 44}`,
          x1: parent.x * 45 + 50,
          y1: parent.y * 150 + 50 - 35,
          x2: child.x * 45 + 50,
          y2: child.y * 150 + 50 + 44,
          value: parent.returned_value,
          time: 0,
        };
      }
    }
  }
}

function fn(i, j, treenode, dp) {
  fullrec.push(treenode);
  if (i == 0) {
    treenode.returned_value = j;
    fullrec.push(treenode.parent);
    return j;
  }
  if (j == 0) {
    treenode.returned_value = i;
    fullrec.push(treenode.parent);
    return i;
  }
  if (dp[i - 1][j - 1] != -1) {
    fullrec.push(treenode.parent);
    treenode.returned_value = dp[i][j];
    treenode.calculated = true;
    return dp[i - 1][j - 1];
  }
  if (str1[i - 1] == str2[j - 1]) {
    treenode.left = node(i - 1, j - 1);
    treenode.left.parent = treenode;
    treenode.returned_value = fn(i - 1, j - 1, treenode.left, dp);
    dp[i - 1][j - 1] = treenode.returned_value;
    let temp = treenode.returned_value;
    fullrec.push(treenode.parent);
    return temp;
  }
  treenode.left = node(i, j - 1);
  treenode.left.parent = treenode;
  treenode.middle = node(i - 1, j);
  treenode.middle.parent = treenode;
  treenode.right = node(i - 1, j - 1);
  treenode.right.parent = treenode;
  let temp1 = fn(i, j - 1, treenode.left, dp);
  let temp2 = fn(i - 1, j, treenode.middle, dp);
  let temp3 = fn(i - 1, j - 1, treenode.right, dp);
  let temp = 1 + Math.min(Math.min(temp1, temp2), temp3);
  treenode.returned_value = temp;
  dp[i - 1][j - 1] = treenode.returned_value;
  if (treenode.parent) fullrec.push(treenode.parent);
  return temp;
}

/*-------------------------------------------------------------------------------------------------------*/

class ED extends Component {
  state = {};
  traverse(xx, yy) {
    let temp = document.getElementById("string_1").value;
    str1 = temp;
    temp = document.getElementById("string_2").value;
    str2 = temp;
    let parent = node(str1.length, str2.length);
    let dp = new Array(str1.length)
      .fill(-1)
      .map(() => new Array(str2.length).fill(-1));
    let x = fn(str1.length, str2.length, parent, dp);
    this.layout(parent);
    //  traversetree(parent);
  }

  nextright(tree) {
    if (tree.thread) {
      return tree.thread;
    }
    if (tree.left || tree.right || tree.middle) {
      if (tree.right) {
        return tree.right;
      } else if (tree.middle) {
        return tree.middle;
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
    if (tree.left || tree.right || tree.middle) {
      if (tree.left) {
        return tree.left;
      } else if (tree.middle) {
        return tree.middle;
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
    if (tree.middle) {
      this.addmod(tree.middle, modsum + tree.mod);
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
    if (tree.left == null && tree.right == null && tree.middle == null) {
      tree.x = 0;
      tree.y = depth;

      return tree;
    }
    if (tree.left == null && tree.right != null && tree.middle == null) {
      let temp_tree = this.setup(tree.right, depth + 1);
      tree.x = temp_tree.x;
      tree.y = temp_tree.y - 1;

      return tree;
    }
    if (tree.middle != null && tree.left == null && tree.right == null) {
      let temp_tree = this.setup(tree.middle, depth + 1);
      tree.x = temp_tree.x;
      tree.y = temp_tree.y - 1;
    }
    if (tree.right == null && tree.left != null && tree.middle == null) {
      let temp_tree = this.setup(tree.left, depth + 1);
      tree.x = temp_tree.x;
      tree.y = temp_tree.y - 1;

      return tree;
    }
    if (tree.middle == null && tree.left && tree.right) {
      let left_tree = this.setup(tree.left, depth + 1);
      let right_tree = this.setup(tree.right, depth + 1);
      tree.x = this.fix_subtrees(left_tree, right_tree);
      tree.y = left_tree.y - 1;
    } else if (tree.left == null && tree.middle && tree.right) {
      let left_tree = this.setup(tree.middle, depth + 1);
      let right_tree = this.setup(tree.right, depth + 1);
      tree.x = this.fix_subtrees(left_tree, right_tree);
      tree.y = left_tree.y - 1;
    } else if (tree.left && tree.middle && tree.right == null) {
      let left_tree = this.setup(tree.left, depth + 1);
      let right_tree = this.setup(tree.middle, depth + 1);
      tree.x = this.fix_subtrees(left_tree, right_tree);
      tree.y = left_tree.y - 1;
    } else {
      let left_tree = this.setup(tree.left, depth + 1);
      let right_tree = this.setup(tree.middle, depth + 1);
      tree.x = this.fix_subtrees(left_tree, right_tree);
      left_tree = this.setup(tree.right, depth + 1);
      tree.x = this.fix_subtrees(right_tree, left_tree);
      tree.x = (tree.left.x + tree.right.x) / 2;
      tree.y = left_tree.y - 1;
    }
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

  clearScreen() {
    for (let i = 0; i < timeout_array.length; i++) {
      clearTimeout(timeout_array[i]);
    }
    timeout_array = [];
    treearray = [];
    treeEdge = [];
    fullrec = [];
    x_place = 0;
    y_place = 0;
    //    parent = node(0, 0);
    this.setState({ nodes: treearray });
    this.setState({ edges: treeEdge });
  }

  animate() {
    for (let i = 0; i < fullrec.length - 1; i++) {
      let time1 = setTimeout(() => {
        treearray.push(fullrec[i]);
        this.setState({ nodes: treearray });
      }, 250 * i);
      timeout_array.push(time1);
      /*
      time1 = setTimeout(() => {
        if (fullrec[i + 1]) {
          let edge_new = edge(fullrec[i], fullrec[i + 1]);
          let temp_id = edge(fullrec[i + 1], fullrec[i]).id;
          let index = -1;
          for (let j = 0; j < treeEdge.length; j++) {
            if (treeEdge[j].id == temp_id) {
              index = j;
              break;
            }
          }
          edge_new.time = i + 2;
          if (index == -1) {
            treeEdge.push(edge_new);
            this.setState({ edges: treeEdge });
            let icon1 = document.getElementById(
              `edge ${edge_new.x1} ${edge_new.y1} ${edge_new.x2} ${edge_new.y2} 1`
            );
            let icon2 = document.getElementById(
              `edge ${edge_new.x1} ${edge_new.y1} ${edge_new.x2} ${edge_new.y2} 2`
            );
            if (icon1) icon1.beginElement();
            if (icon2) icon2.beginElement();
          } else {
            treeEdge.splice(index, 1);
            treeEdge.push(edge_new);
            this.setState({ edges: treeEdge });
            let icon1 = document.getElementById(
              `edge ${edge_new.x1} ${edge_new.y1} ${edge_new.x2} ${edge_new.y2} 1`
            );
            let icon2 = document.getElementById(
              `edge ${edge_new.x1} ${edge_new.y1} ${edge_new.x2} ${edge_new.y2} 2`
            );
            icon1.beginElement();
            icon2.beginElement();
          }
        }
      }, 250 * i + 50);
      timeout_array.push(time1);
      */
    }
  }

  help() {
    this.clearScreen();
    this.traverse(0, 0);
    //  this.layout(parent);
    this.animate();

    //   console.log(dp);
    //  traverseedge(parent);
    //  this.setState({ edges: treeEdge });
    //  this.setState({ nodes: treearray });
  }

  render() {
    const { nodes = [], edges = [] } = this.state;
    return (
      <div className="parent_div">
        <div className="menu">
          <div>
            <input
              id="string_1"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="String 1"
            />
          </div>
          <div>
            <input
              id="string_2"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="String 2"
            />
          </div>
          <div>
            <button className="lcs-visual" onClick={() => this.help()}>
              Visualize
            </button>
          </div>
        </div>
        <div className="hope">
          <div className="padding_style">
            <svg
              className="svg"
              viewBox={`0 0 ${x_place * 45 + 100} ${y_place * 150 + 100}`}
            >
              {nodes.map((node, nodeidx) => {
                const {
                  parent,
                  id,
                  x,
                  y,
                  left,
                  right,
                  middle,
                  str1_idx,
                  str2_idx,
                  value,
                  mod,
                  thread,
                  calculated,
                } = node;
                return (
                  <EDTree
                    key={nodeidx}
                    parent={parent}
                    id={id}
                    x={x}
                    y={y}
                    left={left}
                    right={right}
                    middle={middle}
                    str1_idx={str1_idx}
                    str2_idx={str2_idx}
                    value={value}
                    mod={mod}
                    thread={thread}
                    calculated={calculated}
                  >
                    {value}
                  </EDTree>
                );
              })}

              {edges.map((edge, edgeidx) => {
                const { x1, y1, x2, y2, value, time } = edge;
                return (
                  <EDEdges
                    key={edgeidx}
                    x_1={x1}
                    y_1={y1}
                    x_2={x2}
                    y_2={y2}
                    value={value}
                    time={time}
                  ></EDEdges>
                );
              })}
            </svg>
          </div>
          <div className="footer">made by yatharth katyayan</div>
        </div>
      </div>
    );
  }
}

export default ED;
