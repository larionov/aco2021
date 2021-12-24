import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { union } from 'https://deno.land/x/set_operations/mod.ts';
import { equal } from 'https://deno.land/x/equal/mod.ts';
const i10 = (v) => parseInt(v, 10);
const i2 = (v) => parseInt(v, 2);
const sort = (arr, f = (a, b) => a - b) => {
  const narr = [...arr];
  narr.sort(f);
  return narr;
};
const replaceAt = function (str, index, replacement) {
  return (
    str.substr(0, index) + replacement + str.substr(index + replacement.length)
  );
};
const h = (...v) => v.join('_');
import { permutationsWithReplacement } from 'https://deno.land/x/combinatorics/mod.ts';
import { BinaryHeap } from 'https://deno.land/x/collections@v0.10.2/binary_heap.ts';

function ascend([a1, a2, a3, a], [b1, b2, b3, b]) {
  return a1 - b1;
}

let all = [];

for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}
delete all[0];
delete all[6];
all = all.filter(Boolean);

function getCost(player) {
  switch (player) {
    case 'A':
      return 1;
    case 'B':
      return 10;
    case 'C':
      return 100;
    case 'D':
      return 1000;
  }
  console.log('RRRRRRRRRRRRRRRRRRRRRRRRRrrrrrrr', player);
  return 0;
}
function getPlayers(map) {
  const loc = [];
  for (let i in map) {
    for (let j in map[i]) {
      if (map[i][j].match(/[ABCD]/)) {
        loc.push([map[i][j], [i10(i), i10(j)]]);
      }
    }
  }
  return loc;
}
const playerCols = {
  A: 3,
  B: 5,
  C: 7,
  D: 9,
};
const colPlayers = {
  3: 'A',
  5: 'B',
  7: 'C',
  9: 'D',
};
const movesHash = {};
function possibleMoves(map, start) {
  const key = start.join('_') + map.join('');
  if (movesHash[key]) {
    return movesHash[key];
  }
  const visited = {};
  const resultPaths = [];

  const helper = ([y, x], path = []) => {
    if (visited[h(y, x)]) return;
    visited[h(y, x)] = true;
    resultPaths.push(path);
    const movesAvailable = [];
    if (y === 4) {
      if (map[y - 1][x] === '.') movesAvailable.push([y - 1, x]);
    } else if (y === 3) {
      if (map[y - 1][x] === '.') movesAvailable.push([y - 1, x]);
      if (map[y + 1][x] === '.') movesAvailable.push([y + 1, x]);
    } else if (y === 2) {
      if (map[y - 1][x] === '.') movesAvailable.push([y - 1, x]);
      if (map[y + 1][x] === '.') movesAvailable.push([y + 1, x]);
    } else if (y === 1) {
      if (map[y - 1][x] === '.') movesAvailable.push([y - 1, x]);
      if (map[y + 1][x] === '.') movesAvailable.push([y + 1, x]);
    } else if (y === 0) {
      if (map[y + 1][x] === '.') movesAvailable.push([y + 1, x]);
      if (map[y][x - 1] === '.') movesAvailable.push([y, x - 1]);
      if (map[y][x + 1] === '.') movesAvailable.push([y, x + 1]);
    }
    for (let move of movesAvailable) {
      helper(move, [...path, move]);
    }
  };
  helper(start);
  const c = map[start[0]][start[1]];
  let moves = resultPaths
    .filter((p) => p.length)
    .map((p) => [p[p.length - 1], p.length])
    .filter(([end]) => !(end[0] === 0 && [3, 5, 7, 9].includes(end[1])));
  moves = moves.filter(([end]) => end[0] !== start[0]);
  moves = moves.filter(([end]) => {
    if (end[0] === 4 && playerCols[c] === end[1]) return true;
    if (end[0] === 3 && playerCols[c] === end[1] && map[4][end[1]] === c)
      return true;
    if (
      end[0] === 2 &&
      playerCols[c] === end[1] &&
      map[3][end[1]] === c &&
      map[4][end[1]] === c
    )
      return true;
    if (
      end[0] === 1 &&
      playerCols[c] === end[1] &&
      map[2][end[1]] === c &&
      map[3][end[1]] === c &&
      map[4][end[1]] === c
    )
      return true;
    if (end[0] === 0) return true;
    return false;
  });
  movesHash[key] = moves;
  return moves;
}
function checkWin(map) {
  const locked = [];
  for (let i of [3, 5, 7, 9]) {
    const c = map[4][i];
    if (c === colPlayers[i]) locked.push([c, 4, i]);
  }
  for (let [c, l] of [...locked]) {
    // l = 3
    if (l === 4 && map[3][playerCols[c]] === c)
      locked.push([c, 3, playerCols[c]]);
  }
  for (let [c, l] of [...locked]) {
    // l = 2
    if (l === 3 && map[2][playerCols[c]] === c)
      locked.push([c, 2, playerCols[c]]);
  }
  for (let [c, l] of [...locked]) {
    // l = 1
    if (l === 2 && map[1][playerCols[c]] === c)
      locked.push([c, 1, playerCols[c]]);
  }
  return locked;
}

const copy = (m) => JSON.parse(JSON.stringify(m));
function playMove(map, [start, end]) {
  const newMap = copy(map);
  const c = newMap[start[0]][start[1]];
  newMap[start[0]] = replaceAt(newMap[start[0]], start[1], '.');
  newMap[end[0]] = replaceAt(newMap[end[0]], end[1], c);
  return newMap;
}

function hash([cost, map]) {
  return map.join('');
}
function search(map) {
  const stack = new BinaryHeap(ascend);
  stack.push([0, copy(map), 0, 0]);

  const visited = {};
  let locked = []; //new Set();
  while (stack.length) {
    const s = stack.pop();
    const vis = visited[hash(s)];
    if (vis !== undefined && vis <= s[0]) {
      continue;
    }
    visited[hash(s)] = s[0];
    const [cost, m] = s;

    locked = checkWin(m);
    if (locked.length === 16) {
      console.log('!!!!!!', { cost, m });
      return;
      continue;
    }
    const players = getPlayers(m);
    for (let [c, pos] of players) {
      const found = locked.find(
        ([lc, ll, lj]) => c === lc && ll == pos[0] && lj == pos[1],
      );
      if (found) continue;
      const moves = possibleMoves(m, pos);
      for (let [place, addCost] of moves) {
        const mp = playMove(m, [pos, place]);
        const newCost = cost + addCost * getCost(c);
        stack.push([newCost, mp]);
      }
    }
  }
}
console.log('----------------');
console.log(all);
search(all);
