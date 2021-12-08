import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}

console.log({ all });

const dist = all[0].split(',').map((v) => parseInt(v, 10));
dist.sort((a, b) => a - b);

let max = 0,
  min = 100000;
for (let i = 0; i < dist.length; i++) {
  if (dist[i] > max) max = dist[i];
  if (dist[i] < min) min = dist[i];
}
console.log({ dist, min, max });

const sum = (l) => dist.reduce((acc, v) => acc + Math.abs(v - l), 0);

console.log(dist.map((v) => sum(v)));

// let i = min;
// let j = max;
// while ( i< j) {
//     const l = sum(i);
//     const r = sum(j);

//  //   if (

// }
let prev = sum(dist[0]);
for (let i = 1; i < dist.length; i++) {
  //  console.log({ i, prev }, sum(dist[i]));
  if (sum(dist[i]) > prev) {
    console.log(dist[i - 1], sum(dist[i - 1]));
    break;
  }
  prev = sum(dist[i]);
}
