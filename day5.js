import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

function getLine(x1, y1, x2, y2) {
  if (x1 === x2) {
    return [...Array(y2 > y1 ? y2 - y1 + 1 : y1 - y2 + 1).keys()].map((a) => [
      x1,
      parseInt(a, 10) + (y2 > y1 ? y1 : y2),
    ]);
  }
  if (y1 === y2) {
    return [...Array(x2 > x1 ? x2 - x1 + 1 : x1 - x2 + 1).keys()].map((a) => [
      parseInt(a, 10) + (x2 > x1 ? x1 : x2),
      y1,
    ]);
  }
  return [];
}
function i(...args) {
  return args.join('_');
}
const map = {};

const all = [];
let max = 0;
for await (let line of readLines(Deno.stdin)) {
  //  all.push(line);
  const [[x1, y1], [x2, y2]] = line
    .split(' -> ')
    .map((c) => c.split(',').map((v) => parseInt(v, 10)));
  // console.log(line, [
  //   [x1, y1],
  //   [x2, y2],
  // ]);
  const res = getLine(x1, y1, x2, y2);
  console.log(line, res);
  res.forEach((p) => {
    if (map[i(p)] === undefined) map[i(p)] = 1;
    else map[i(p)]++;
    if (map[i(p)] > max) max = map[i(p)];
  });
}
console.log({ map, max });

console.log(Object.values(map).filter((a) => a >= 2).length);
//console.log({ all });
