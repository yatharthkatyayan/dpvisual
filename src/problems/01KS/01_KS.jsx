import React, { Component } from "react";
import LCSTree from "../LCS/LCS_tree";
import LCSEdges from "../LCS/lcs_edges";
let treearray = [];
let treeEdge = [];
let fullrec = [];
let value_array = [];
let weight_array = [];
let timeout_array = [];
let toggle = 1;
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
    returned_value: -1,
    calculated: 0,
  };
}

function toggled() {
  toggle = !toggle;
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

  if (j < 0) {
    treenode.returned_value = "-∞";
    fullrec.push(treenode.parent);
    return -Infinity;
  }

  if (i == value_array.length) {
    treenode.returned_value = 0;
    fullrec.push(treenode.parent);
    return 0;
  }

  /*----------------------------------Memory remover---------------------------------------------*/
  if (dp[i][j - 1] != -1) {
    fullrec.push(treenode.parent);
    treenode.returned_value = dp[i][j - 1];
    treenode.calculated = 1;
    return dp[i][j - 1];
  }

  /*------------------------------------------------------------------------------------------------*/

  treenode.left = node(i + 1, j);
  treenode.left.parent = treenode;
  treenode.right = node(i + 1, j - weight_array[i]);
  treenode.right.parent = treenode;
  let temp1 = fn(i + 1, j, treenode.left, dp);
  let temp2 =
    value_array[i] + fn(i + 1, j - weight_array[i], treenode.right, dp);
  let temp = Math.max(temp1, temp2);
  treenode.returned_value = temp;
  dp[i][j - 1] = treenode.returned_value;
  if (treenode.parent) fullrec.push(treenode.parent);
  return temp;
}
function takeValues(val) {
  let number_pattern = /-?\d*\.{0,1}\d+/g;

  let numbers = val.match(number_pattern);
  if (numbers) {
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = parseInt(numbers[i], 10);
    }
  }
  return numbers;
}

function traversetree(node) {
  treearray.push(node);
  if (node.left) {
    traversetree(node.left);
  }
  if (node.right) {
    traversetree(node.right);
  }
  if (node.parent) {
    treeEdge.push(edge(node, node.parent));
  }
}

function codeShow() {
  let x = document.getElementById("codeid");
  if (x) {
    x.classList.toggle("active");
  }
  let content = x.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

/*-------------------------------------------------------------------------------------------------------*/

class KS extends Component {
  state = {};

  traverse(xx, yy) {
    let temp = document.getElementById("values").value;
    value_array = takeValues(temp);
    temp = document.getElementById("weights").value;
    weight_array = takeValues(temp);
    temp = document.getElementById("sum").value;
    let sum = 0;
    if (takeValues(temp)) sum = takeValues(temp)[0];
    let dp;
    if (value_array) {
      dp = new Array(value_array.length)
        .fill(-1)
        .map(() => new Array(sum).fill(-1));
    }
    let parent = node(xx, sum);
    let x = 0;
    if (sum > 0) x = fn(xx, sum, parent, dp);
    this.layout(parent);
    if (toggle == 0) {
      traversetree(parent);
    }
    return x;
    /*
    console.log(dp);
    console.log(value_array);
    console.log(weight_array);
    console.log(x);
    console.log(fullrec);
    */
  }

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

  clearScreen() {
    for (let i = 0; i < timeout_array.length; i++) {
      clearTimeout(timeout_array[i]);
    }
    document.getElementById("kpsk_data").classList.add("remove");
    timeout_array = [];
    treearray = [];
    treeEdge = [];
    fullrec = [];
    x_place = 0;
    y_place = 0;

    this.setState({ nodes: treearray });
    this.setState({ edges: treeEdge });
  }

  animate(ans) {
    let time_delay = 0;
    let time_curve = 0;
    if (toggle) {
      time_delay = 400;
      time_curve = 50;
      for (let i = 0; i < fullrec.length - 1; i++) {
        let time1 = setTimeout(() => {
          treearray.push(fullrec[i]);
          this.setState({ nodes: treearray });
        }, time_delay * i);
        timeout_array.push(time1);
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
              if (icon1) icon1.beginElement();
              if (icon2) icon2.beginElement();
            }
          }
        }, time_delay * i + time_curve);
        timeout_array.push(time1);
      }
    } else {
      this.setState({ nodes: treearray });
      this.setState({ edges: treeEdge });
    }
    let time1 = setTimeout(() => {
      if (document.getElementById("kpsk_data"))
        document.getElementById("kpsk_data").classList.remove("remove");
      this.setState({ Knapsack_ans: ans });
    }, fullrec.length * time_delay);
    timeout_array.push(time1);
  }

  componentDidMount() {
    this.clearScreen();
    toggle = 1;
  }

  help() {
    this.clearScreen();
    let x = this.traverse(0, 0);
    this.animate(x);
  }

  render() {
    const { nodes = [], edges = [], Knapsack_ans = 0 } = this.state;

    return (
      <div className="parent_div">
        <div className="menu">
          <div className=" lcs_prblm">
            <p>
              Given weights and values of n items, put these items in a knapsack
              of capacity W to get the maximum total value in the knapsack.
            </p>
            <p>
              You cannot break an item, either pick the complete item or don’t
              pick it (0-1 property).
            </p>
            <p>For example :</p>
            <p>Values : [60,100,120]</p>
            <p>Weights : [10,20,30]</p>
            <p>Knapsack Capacity : 50</p>
            <p>Output : 220</p>
            <p>
              *NOTE : WHITE NODES ARE CALCULATED.
              <br />
              <br />
              *NOTE : BLACK NODES ARE MEMORISED.
            </p>
          </div>
          <div>
            <input
              id="values"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="Values"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div>
            <input
              id="weights"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="Weights"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div>
            <input
              id="sum"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="Knapsack capacity"
              spellCheck={false}
              autoComplete="off"
            />
          </div>

          <div className="toggle_check">
            <label>Enable step-by-step animation</label>
            <label className="switch toggle_bar">
              <input
                type="checkbox"
                defaultChecked
                onClick={() => toggled()}
              ></input>
              <div className="slider round "></div>
            </label>
          </div>

          <button
            id="codeid"
            className="collapsible"
            onClick={() => {
              codeShow();
            }}
          >
            View Code
          </button>
          <div className="content code">
            <pre>
              {`
/*

initialize whole dp matrix to -1;

dp[values.length][KnapsackCapacity] = -1;

*/

function fn(i,s) {
  // i-th item 
  
  //knapsack with available capacity s
  
  if (s < 0) return -Infinity

  if (i == v.length) return 0
  
  if(dp[i][j-1] != -1){
    return dp[i][j-1];
  }

  dp[i][j-1] = Math.max(
    fn(i+1, s),
    v[i] + fn(i+1, s-w[i])
  );

  return dp[i][j-1];

}
              `}
            </pre>
          </div>

          <div id="kpsk_data" className="lcs_length remove">
            <p>Output = {Knapsack_ans}</p>
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
                  str1_idx,
                  str2_idx,
                  value,
                  mod,
                  thread,
                  calculated,
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
                    calculated={calculated}
                  >
                    {value}
                  </LCSTree>
                );
              })}

              {edges.map((edge, edgeidx) => {
                const { x1, y1, x2, y2, value, time } = edge;
                return (
                  <LCSEdges
                    key={edgeidx}
                    x_1={x1}
                    y_1={y1}
                    x_2={x2}
                    y_2={y2}
                    value={value}
                    time={time}
                  ></LCSEdges>
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

export default KS;
