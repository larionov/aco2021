import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { union } from 'https://deno.land/x/set_operations/mod.ts';
import { permutationsWithReplacement } from 'https://deno.land/x/combinatorics/mod.ts';
const i10 = (v) => parseInt(v, 10);
const i2 = (v) => parseInt(v, 2);

/*
Player 1 starting position: 4
Player 2 starting position: 8

Player 1 starting position: 5
Player 2 starting position: 8
*/

const p1start = 5;
const p2start = 8;

function getRolls() {
  let rolls = [];
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      for (let k = 1; k <= 3; k++) {
        rolls.push(i + j + k);
      }
    }
  }
  return rolls;
}
const rolls = getRolls();

const cache = {};
function sim(p1pos, p2pos, p1s, p2s) {
  const k = JSON.stringify({ p1pos, p2pos, p1s, p2s });
  if (cache[k]) return cache[k];
  let p1wins = 0;
  let p2wins = 0;
  for (let roll of rolls) {
    let newp1pos = ((p1pos + roll - 1) % 10) + 1;
    let newp1s = p1s + newp1pos;
    if (newp1s >= 21) {
      p1wins++;
    } else {
      let next = sim(p2pos, newp1pos, p2s, newp1s);
      p1wins += next.p2wins;
      p2wins += next.p1wins;
    }
  }
  cache[k] = { p1wins, p2wins };
  console.log({ p1wins, p2wins });
  return { p1wins, p2wins };
}

const res = sim(p1start, p2start, 0, 0);
console.log({ res });
console.log(Math.max(res.p1wins, res.p2wins));
// 444356092776315, 341960390180808
