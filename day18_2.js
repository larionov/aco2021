import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';

import { permutations } from 'https://deno.land/x/combinatorics/mod.ts';
const all = [];
const isNum = (n) => typeof n === 'number';

for await (let line of readLines(Deno.stdin)) {
  all.push(tokenize(line));
}
function tokenize(n) {
  return n
    .split('')
    .filter((v) => v.match(/\d/) || ['[', ']'].includes(v))
    .map((v) => (v.match(/\d/) ? parseInt(v, 10) : v));
}

function explode(n) {
  let level = 0;
  const pairIndex = slidingWindows(n, 2).findIndex((pair, index, a) => {
    if (pair[0] === '[') level++;
    if (pair[0] === ']') level--;
    if (level === 5 && isNum(pair[0]) && isNum(pair[1])) {
      return true;
    }
    return false;
  });
  if (pairIndex === -1) return false;
  for (let i = pairIndex - 1; i >= 0; i--) {
    if (n[i] === ']') continue;
    if (n[i] === '[') continue;
    n[i] += n[pairIndex];
    break;
  }
  for (let i = pairIndex + 2; i < n.length; i++) {
    if (n[i] === '[') continue;
    if (n[i] === ']') continue;
    n[i] += n[pairIndex + 1];
    break;
  }
  n.splice(pairIndex - 1, 4, 0);
  return true;
}

function split(n) {
  const numIndex = n.findIndex((num, index, a) => isNum(num) && num >= 10);
  if (numIndex === -1) return false;
  n.splice(
    numIndex,
    1,
    ...['[', Math.floor(n[numIndex] / 2), Math.ceil(n[numIndex] / 2), ']'],
  );
  return true;
}
function reduce(num) {
  while (1) {
    if (!explode(num)) {
      if (!split(num)) {
        return;
      }
    }
  }
}
function plus(n, m) {
  return ['[', ...n, ...m, ']'];
}

function mag(n) {
  while (1) {
    const pairIndex = slidingWindows(n, 2).findIndex(
      (pair, index, a) => isNum(pair[0]) && isNum(pair[1]),
    );
    if (pairIndex === -1) return n;
    n.splice(pairIndex - 1, 4, 3 * n[pairIndex] + 2 * n[pairIndex + 1]);
  }
  return 1;
}
let n;

const max = [...permutations(all, 2)].map(([a, b]) => {
  let n = plus(a, b);
  reduce(n);
  return mag(n);
});

console.log(Math.max(...max));
