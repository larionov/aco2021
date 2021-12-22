import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { union } from 'https://deno.land/x/set_operations/mod.ts';
const i10 = (v) => parseInt(v, 10);
const i2 = (v) => parseInt(v, 2);
const sort = (arr) => {
  const narr = [...arr];
  narr.sort((a, b) => a - b);
  return narr;
};
import { permutationsWithReplacement } from 'https://deno.land/x/combinatorics/mod.ts';

const all = [];

for await (let line of readLines(Deno.stdin)) {
  let [state, coords] = line.split(' ');
  coords = coords.split(',').map((v) => v.split('=')[1].split('..').map(i10));
  coords = coords.map(sort);
  //  console.log({ coords });
  all.push([state === 'on' ? 1 : 0, coords]);
}
//console.log({ all });

const map = {};

// function flatten([x1, y1, z1], [x2, y2, z2]) {
//     if (x1[0] < x2[0] && x1[1] > x2[1]) {
//     }

// }
const h = (...args) => args.join('_');

function intLine(d1, d2) {
  const newD = [Math.max(d1[0], d2[0]), Math.min(d1[1], d2[1])];
  if (newD[0] > newD[1]) return false;

  return newD;
}
// function intersectSize(cube1, cube2) {
//   const res = intersect(cube1, cube2);
//   if (!res) return false;
//   const [newXX, newYY, newZZ] = res;
//   return (newXX[1] - newXX[0]) * (newYY[1] - newYY[0]) * (newZZ[1] - newZZ[0]);
// }
function intersect([xx1, yy1, zz1], [xx2, yy2, zz2]) {
  const newXX = intLine(xx1, xx2);
  const newYY = intLine(yy1, yy2);
  const newZZ = intLine(zz1, zz2);
  if (!newXX || !newYY || !newZZ) return false;
  else return [newXX, newYY, newZZ];
}
// function intersectAll(cubes) {
//   let is = cubes[0];
//   for (let i = 1; i < cubes.length; i++) {
//     const res = intersect(is, cubes[1]);
//     if (!res) continue;
//     is = res;
//   }
//   return is;
// }
function cubeSize([XX, YY, ZZ]) {
  return (XX[1] - XX[0] + 1) * (YY[1] - YY[0] + 1) * (ZZ[1] - ZZ[0] + 1);
}
console.log('-----------------');
//const on = [];
let total = 0;

function intersectPrevious(line, ops) {
  const splits = [];

  if (line[0]) splits.push(line);

  for (const [on, coords] of ops) {
    const is = intersect(line[1], coords);
    if (!is) continue;
    splits.push([on ? 0 : 1, is]);
  }
  return splits;
}

const ops = [];
for (let line of all) {
  const [on, coords] = line;
  ops.push(...intersectPrevious(line, ops));
}
//console.log(ops.map((v) => v.join(' ')));

for (let [on, coords] of ops) {
  total += (on ? 1 : -1) * cubeSize(coords);
}

// if (line[0]) {
//   on.push([...line, []]);
//   total += cubeSize(line[1]);
//   //console.log({ total });
// } else {
//   for (let con of on) {
//     con[2].push(line[1]);
//     const isMinus = intersectAll(con[2]);
//     if (isMinus) {
//       console.log({ isMinus });
//       total -= cubeSize(isMinus);
//     }
//     //console.log('---', { total });
//   }
// }

//console.log({ on });

// demo2
// 2758514936282235

//console.log(map);
// console.log(all.length);
console.log(ops.length);
console.log('part2:', total);
