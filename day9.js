import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line.split('').map((v) => parseInt(v, 10)));
}

console.log({ all });
let count = 0;

function getNeighbors(all, r, c) {
  const res = [];
  if (r > 0) res.push([r - 1, c]);
  if (r < all.length - 1) res.push([r + 1, c]);
  if (c > 0) res.push([r, c - 1]);
  if (c < all[0].length - 1) res.push([r, c + 1]);
  return res;
}
console.log('test');
for (let r = 0; r < all.length; r++) {
  for (let c = 0; c < all[0].length; c++) {
    //    console.log({ r, c }, all[r][c]);
    //    console.log({ r, c }, all.length, all[0].length);
    //    console.log(getNeighbors(all, r, c));
    const nei = getNeighbors(all, r, c).map(([y, x]) => all[y][x]);
    nei.sort();
    console.log({ r, c, nei });
    if (all[r][c] < nei[0]) {
      count += all[r][c] + 1;
    }
  }
}
console.log({ count });
