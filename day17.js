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
  all.push(line);
}
console.log(all);

const areaText = all[0]
  .replace('target area: ', '')
  .replace('x=', '')
  .replace('y=', '');
console.log(areaText);
const [[minX, maxX], [minY, maxY]] = areaText
  .split(', ')
  .map((v) => v.split('..').map((v) => parseInt(v, 10)));

console.log([
  [minX, maxX],
  [minY, maxY],
]);

function step({ X, XV, Y, YV }) {
  const N = { X, XV, Y, YV };
  //  console.log({ N });
  N.X += XV;
  if (N.XV > 0) N.XV -= 1;
  N.Y += YV;
  N.YV -= 1;
  return N;
}
//target area: x=20..30, y=-10..-5
// XV 7, YV 2
/*          1         2         3
  0123456789012345678901234567890
 3.............#....#............
 2.......#..............#........
 1...............................
 0S........................#.....
-1...............................
-2...............................
-3...........................#...
-4...............................
-5....................TTTTTTTTTTT
-6....................TTTTTTTTTTT
-7....................TTTTTTTT#TT
-8....................TTTTTTTTTTT
-9....................TTTTTTTTTTT
-10....................TTTTTTTTTTT
*/
function simulate(init) {
  let maxYPosition = init.Y;
  let V = Object.assign({}, init);
  //  console.log({ init, maxX, maxY });
  while (V.X <= maxX /*&& V.Y >= minY*/) {
    maxYPosition = Math.max(maxYPosition, V.Y);
    if (V.X >= minX && V.Y <= maxY && V.Y >= minY) return maxYPosition;
    V = step(V);
    //console.log('step', V);
    if (V.XV === 0 && (V.X < minX || V.X > maxX)) return false;
    if (V.YV < 0 && V.Y < minY) return false;
  }
  return false;
}

console.log(simulate({ X: 0, Y: 0, XV: 7, YV: 2 }));
// console.log(simulate({ X: 0, Y: 0, XV: 6, YV: 3 }));
// console.log(simulate({ X: 0, Y: 0, XV: 9, YV: 0 }));
// console.log(simulate({ X: 0, Y: 0, XV: 17, YV: -4 }));
// console.log(simulate({ X: 0, Y: 0, XV: 1, YV: -10 }));
// console.log(simulate({ X: 0, Y: 0, XV: 6, YV: -10 }));

let tops = [];
for (let vx = -2000; vx < 2000; vx++) {
  for (let vy = -2000; vy < 2000; vy++) {
    //    console.log({ vx, vy });
    const top = simulate({ X: 0, Y: 0, XV: vx, YV: vy });
    if (top !== false) {
      tops.push([top, vx, vy]);
      console.log({ vx, vy, top });
    }
  }
}

tops.sort((a, b) => b[0] - a[0]);
console.log(tops[0], tops.length);
