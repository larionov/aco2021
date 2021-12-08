import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

const cost = (n) => (n * (n + 1)) / 2;

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

const sum = (l) => dist.reduce((acc, v) => acc + cost(Math.abs(v - l)), 0);

// console.log(dist.map((v) => sum(v)));
// for (let i = min; i < max; i++) {
//   console.log({ i }, sum(i));
// }

// let i = min;
// let j = max;
// while ( i< j) {
//     const l = sum(i);
//     const r = sum(j);

//  //   if (

// }
let prev = sum(min);
for (let i = min; i < max; i++) {
  //  console.log({ i, prev }, sum(dist[i]));
  if (sum(i) > prev) {
    console.log(i - 1, sum(i - 1));
    break;
  }
  prev = sum(i);
}

// for (let i = 0; i < 20; i++) {
//   console.log(cost(i));
// }

// 1 3 6 10 15 21

// 0 + 1
// 0 + 1 + 2
// 0 + 1 + 2 + 3a
