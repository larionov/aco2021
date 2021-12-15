import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';

// const objAdd = (o, p, v) => {
//   if (o[p] === undefined) o[p] = 0;
//   o[p] += v;
// };
// const objSub = (o, p, v) => {
//   o[p] -= v;
//   if (o[p] == 0) delete o[p];
// };
const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line.split('').map((v) => parseInt(v, 10)));
}

const h = ([i, j]) => `${i}-${j}`;
const get = (grid, [i, j]) => grid[i][j];
//const getEdge = (a, b) => h(a) + ',' + h(b);

const getNeighbors = (grid, [i, j]) => {
  const res = [];
  if (i > 0) res.push([i - 1, j]);
  if (i < grid.length - 1) res.push([i + 1, j]);
  if (j > 0) res.push([i, j - 1]);
  if (j < grid[0].length - 1) res.push([i, j + 1]);
  return res;
};
//console.log({ all });
console.log('---------');
function search(grid) {
  const visited = {};
  const weights = {};
  const stack = [[[0, 0], 0]];

  while (stack.length) {
    stack.sort((a, b) => b[1] - a[1]);
    const [top, weight] = stack.pop();
    if (visited[h(top)]) continue;
    if (top[0] === grid.length - 1 && top[1] === grid[0].length - 1) {
      console.log({ top, weight });
      return weight;
    }
    visited[h(top)] = true;

    console.log({ top, weight });
    const children = getNeighbors(grid, top);
    for (let c of children) {
      //console.log({ c });
      if (visited[h(c)]) continue;

      const v = get(grid, c);
      stack.push([c, weight + v]);
    }
    //    weights[h(top)] = minWeight;
  }
}
console.log(search(all, [0, 0]));
//console.log({ weights });
