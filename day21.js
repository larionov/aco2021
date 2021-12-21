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

let p1s = 0;
let p2s = 0;
let p1pos = p1start;
let p2pos = p2start;
let rolls = 0;
let die = 1;
let lose = 0;
while (1) {
  p1pos = ((p1pos + die++ + die++ + die++ - 1) % 10) + 1;
  p1s += p1pos;
  rolls += 3;
  if (p1s >= 1000) {
    lose = p2s;
    break;
  }
  p2pos = ((p2pos + die++ + die++ + die++ - 1) % 10) + 1;
  p2s += p2pos;
  rolls += 3;
  if (p2s >= 1000) {
    lose = p1s;
    break;
  }
}

console.log({ p1pos, p2pos, p1s, p2s, rolls });
console.log({ lose, rolls }, lose * rolls);
// const p1 = 5;
// const p2 = 8;
