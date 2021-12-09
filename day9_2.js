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
const visited = {};
function flood(all, r, c) {
  if (visited[`${r}_${c}`]) return 0;
  visited[`${r}_${c}`] = true;
  if (all[r][c] === 9) return 0;
  console.log({ r, c }, all[r][c]);
  const nei = getNeighbors(all, r, c).filter(
    ([i, j]) => visited[`${i}_${j}`] === undefined,
  );
  let size = 0;
  //  console.log({ nei });
  for (let i = 0; i < nei.length; i++) {
    const [y, x] = nei[i];
    //if (all[y][x] > all[r][c]) {
    size += flood(all, y, x);
    //}
  }

  return size + 1;
}

console.log('test');
let sizes = [];
for (let r = 0; r < all.length; r++) {
  for (let c = 0; c < all[0].length; c++) {
    console.log('--start', { r, c });
    const size = flood(all, r, c);
    console.log('<<', size);
    sizes.push(size);
  }
}
sizes.sort((a, b) => b - a);
console.log({ sizes });
console.log(sizes[0] * sizes[1] * sizes[2]);
