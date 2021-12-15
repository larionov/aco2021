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
const get = (grid, [i, j]) => {
  const ii = i % grid.length;
  const jj = j % grid[0].length;
  const ki = Math.floor(i / grid.length);
  const kj = Math.floor(j / grid[0].length);
  //console.log({ i, j, ii, jj, ki, kj }, grid[ii][jj]);
  return (grid[ii][jj] + ki + kj) % 9 || 9;
};
//const getEdge = (a, b) => h(a) + ',' + h(b);

const getNeighbors = (grid, [i, j]) => {
  const res = [];
  if (i > 0) res.push([i - 1, j]);
  if (i < grid.length * 5 - 1) res.push([i + 1, j]);
  if (j > 0) res.push([i, j - 1]);
  if (j < grid[0].length * 5 - 1) res.push([i, j + 1]);
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
    if (top[0] === grid.length * 5 - 1 && top[1] === grid[0].length * 5 - 1) {
      console.log({ top, weight });
      return weight;
    }
    visited[h(top)] = true;

    //console.log({ top, weight });
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
//console.log(get(all, [0, 49]));
//console.log({ weights });
/*
1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581

*/

// for (let i of range(0, 50)) {
//   let s = [];
//   for (let j of range(0, 50)) {
//     s.push(get(all, [i, j]));
//   }
//   console.log(s.join(''));
// }

//11637517422274862853338507306444061841755517205286
//11637517422274862853338597396444961841755517295286

//- 67553889257866499036897750014790886112580199722369
//- 67554880357866500146807761125701887223681200833470
//- 67554881357866511146817761125711887223681211833471
//+ 67554889357866599146897761125791887223681299833479
