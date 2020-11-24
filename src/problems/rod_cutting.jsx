import React, { Component } from "react";
import LCSTree from "./LCS/LCS_tree";
import LCSEdges from "./LCS/lcs_edges";
import LCS_string from "./LCS/LCS_string";
let treearray = [];
let treeEdge = [];
let fullrec = [];
let length_array = [];
let price_array = [];
let rod_length = 0;
let timeout_array = [];
let toggle = 1;
let parent = node(0, 0);
let x_place = 0;
let y_place = 0;

function node(i) {
  return {
    parent: null,
    id: `${i}`,
    x: 0,
    y: 0,
    children: [],
    value: `${i}`,
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
    if (child.parent == parent) {
      /* parent to child*/

      if (parent.x > child.x) {
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
      } else if (parent.x < child.x) {
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
      } else if (parent.x == child.x) {
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

      if (parent.x < child.x) {
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
      } else if (parent.x > child.x) {
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
      } else if (parent.x == child.x) {
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

function fn(price, rod_length, treenode, dp) {
  fullrec.push(treenode);
  if (rod_length <= 0) {
    treenode.returned_value = 0;
    fullrec.push(treenode.parent);
    return 0;
  }
  /*----------------------------------Memory remover---------------------------------------------*/
  if (dp[rod_length - 1] != -1) {
    fullrec.push(treenode.parent);
    treenode.returned_value = dp[rod_length - 1];
    treenode.calculated = 1;
    return dp[rod_length - 1];
  }
  /*------------------------------------------------------------------------------------------------*/
  let maxval = -Infinity;

  for (let k = 1; k <= rod_length; k++) {
    let temp = node(rod_length - k);

    temp.parent = treenode;
    treenode.children.push(temp);
    let cost = price[k - 1] + fn(price, rod_length - k, temp, dp);
    if (cost > maxval) {
      maxval = cost;
    }
  }

  dp[rod_length - 1] = maxval;
  treenode.returned_value = dp[rod_length - 1];
  if (treenode.parent) fullrec.push(treenode.parent);

  return maxval;
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
  if (node.parent) {
    treeEdge.push(edge(node, node.parent));
  }
  for (let i = 0; i < node.children.length; i++) {
    traversetree(node.children[i]);
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

class ROD extends Component {
  state = {};

  traverse(xx, yy) {
    let temp = document.getElementById("price").value;
    price_array = takeValues(temp);
    temp = document.getElementById("rod_length").value;
    if (takeValues(temp)) rod_length = takeValues(temp)[0];
    let parent = node(rod_length);
    let dp = new Array(rod_length).fill(-1);
    let x = fn(price_array, rod_length, parent, dp);
    console.log("ans :", x);
    console.log(price_array, rod_length);
    this.layout(parent);
    if (toggle == 0) traversetree(parent);
    return x;
  }

  nextright(tree) {
    if (tree.thread) {
      return tree.thread;
    }
    if (tree.children[tree.children.length - 1]) {
      return tree.children[tree.children.length - 1];
    }
    return null;
  }

  nextleft(tree) {
    if (tree.thread) {
      return tree.thread;
    }
    if (tree.children[0]) {
      return tree.children[0];
    }
    return null;
  }

  addmod(tree, modsum = 0) {
    tree.x = tree.x + modsum;
    x_place = Math.max(x_place, tree.x);
    y_place = Math.max(y_place, tree.y);
    for (const child of tree.children) {
      this.addmod(child, modsum + tree.mod);
    }
    return tree;
  }

  layout(tree) {
    return this.addmod(this.setup(tree, 0), 0);
  }

  setup(tree, depth) {
    if (tree.children.length === 0) {
      tree.x = 0;
      tree.y = depth;
      return tree;
    }

    if (tree.children.length === 1) {
      let temp_tree = this.setup(tree.children[0], depth + 1);
      tree.x = temp_tree.x;
      tree.y = temp_tree.y - 1;
      return tree;
    }

    const [firstChild, ...children] = tree.children;
    let leftChild = this.setup(firstChild, depth + 1);
    tree.y = leftChild.y - 1;
    for (const child of children) {
      const rightChild = this.setup(child, depth + 1);

      this.fix_subtrees(leftChild, rightChild);
      leftChild = rightChild;
    }

    tree.x =
      (tree.children[0].x + tree.children[tree.children.length - 1].x) / 2;
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
      if (li.parent.mod) ro.mod += li.parent.mod;
    }
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

    document.getElementById("ROD_data").classList.add("remove");

    timeout_array = [];
    treearray = [];
    treeEdge = [];
    fullrec = [];
    x_place = 0;
    y_place = 0;
    parent = node(0, 0);
    this.setState({ nodes: treearray });
    this.setState({ edges: treeEdge });
  }

  animate(ans) {
    let delay_time = 0;
    let delay_edge = 0;

    if (toggle) {
      delay_time = 400;
      delay_edge = 50;

      for (let i = 0; i < fullrec.length - 1; i++) {
        let time1 = setTimeout(() => {
          treearray.push(fullrec[i]);

          this.setState({ nodes: treearray });
        }, delay_time * i);

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
        }, delay_time * i + delay_edge);
        timeout_array.push(time1);
      }
    } else {
      this.setState({ nodes: treearray });
      this.setState({ edges: treeEdge });
    }
    let time2 = setTimeout(() => {
      if (document.getElementById("ROD_data"))
        document.getElementById("ROD_data").classList.remove("remove");
      this.setState({ ans: ans });
    }, fullrec.length * delay_time);
    timeout_array.push(time2);
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
    const { nodes = [], edges = [], ans = 0 } = this.state;

    return (
      <div className="parent_div">
        <div className="menu">
          <div className=" lcs_prblm">
            <p>
              Given a rod of length n inches and an array of prices that
              contains prices of all pieces of size smaller than n. Determine
              the maximum value obtainable by cutting up the rod and selling the
              pieces.
            </p>
            <p>For example :</p>
            <p>Prices : [1, 5, 8, 9, 10, 17, 17, 20]</p>
            <p>Output : 22</p>
            <p>
              The maximum obtainable value is 22 (by cutting in two pieces of
              lengths 2 and 6){" "}
            </p>
            <p>
              *NOTE : WHITE NODES ARE CALCULATED.
              <br />
              <br />
              *NOTE : BLACK NODES ARE MEMORISED.
            </p>
          </div>

          <div>
            <input
              id="price"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="Prices"
              spellCheck={false}
              autoComplete="off"
            />
          </div>
          <div>
            <input
              id="rod_length"
              className="input_lcs font_input"
              required={true}
              type="text"
              placeholder="Rod length"
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

initialize whole dp array to -1;

dp[Rod_length] = -1;

*/

function fn(Prices,Rod_length) {
    
  //Prices --> Prices array of rod.
  //Rod_length --> length of rod.

  if (Rod_length == 0){
    return 0;
   }
  
  if(dp[Rod_length-1] != -1){
    return dp[Rod_length-1];
  }

  let max_value = -Infinity;
  
  for(let i = 1; i<=Rod_length; i++){
    
    let cost = Prices[i-1]
     + fn(Prices,Rod_length-i);
    
    if(max_value < cost){
        max_value = cost;
    }

  }

  dp[Rod_length-1] = max_value;

}    
              `}
            </pre>
          </div>

          <div id="ROD_data" className="lcs_length remove">
            <p>Output = {ans}</p>
          </div>

          <div>
            <button className="lcs-visual" onClick={() => this.help()}>
              Visualize
            </button>
          </div>
        </div>
        <div className="hope">
          <div className="padding_style">
            <div className="graph">
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
          </div>
          <div className="footer">made by yatharth katyayan</div>
        </div>
      </div>
    );
  }
}

export default ROD;
