import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';

const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}
const [pointsText, instrText] = all
  .join('\n')
  .split('\n\n')
  .map((v) => v.split('\n'));

const points = pointsText.map((v) => v.split(','));
const pointsMap = points.reduce((acc, [x, y]) => {
  acc[`${x}-${y}`] = true;
  return acc;
}, {});
function get(pointsMap, x, y) {
  return pointsMap[`${x}-${y}`];
}
function del(pointsMap, x, y) {
  delete pointsMap[`${x}-${y}`];
}
function mark(pointsMap, x, y, v) {
  if (!pointsMap[`${x}-${y}`] && v) {
    pointsMap[`${x}-${y}`] = v;
  }
}
const instr = instrText
  .map((v) => v.match(/([a-z])\=(\d+)/))
  .map((v) => [v[1], parseInt(v[2], 10)]);

let maxY = Math.max(...points.map(([_, v]) => v));
let maxX = Math.max(...points.map(([v, _]) => v));
console.log({ pointsMap, instr, maxX, maxY });
function foldUp(foldY) {
  for (let i of range(0, foldY)) {
    for (let j of range(0, maxX + 1)) {
      const oldPoint = get(pointsMap, j, i);
      const newPoint = get(pointsMap, j, 2 * foldY - i);
      del(pointsMap, j, 2 * foldY - i);
      mark(pointsMap, j, i, newPoint);
    }
  }
  maxY = foldY;
}
function foldLeft(foldX) {
  for (let i of range(0, maxY + 1)) {
    for (let j of range(0, foldX)) {
      const oldPoint = get(pointsMap, j, i);
      const newPoint = get(pointsMap, 2 * foldX - j, i);
      del(pointsMap, 2 * foldX - j, i);
      mark(pointsMap, j, i, newPoint);
    }
  }
  maxX = foldX;
}

console.log('before', Object.keys(pointsMap).length);
for (let [dir, val] of instr) {
  if (dir === 'x') foldLeft(val);
  if (dir === 'y') foldUp(val);
}

console.log('after', Object.keys(pointsMap).length);
console.log({ pointsMap, maxX, maxY });

for (let i of range(0, maxY + 1)) {
  let str = '';
  for (let j of range(0, maxX + 1)) {
    if (get(pointsMap, j, i)) {
      str += 'X';
    } else {
      str += ' ';
    }
  }
  console.log(str);
}
/*

X....XXX..XXXX...XX.XXX....XX.XXXX.X..X..
X....X..X.X.......X.X..X....X.X....X..X..
X....X..X.XXX.....X.XXX.....X.XXX..XXXX..
X....XXX..X.......X.X..X....X.X....X..X..
X....X.X..X....X..X.X..X.X..X.X....X..X..
XXXX.X..X.X.....XX..XXX...XX..XXXX.X..X..
.........................................
*/
