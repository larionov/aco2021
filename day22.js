import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { union } from 'https://deno.land/x/set_operations/mod.ts';
const i10 = (v) => parseInt(v, 10);
const i2 = (v) => parseInt(v, 2);

import { permutationsWithReplacement } from 'https://deno.land/x/combinatorics/mod.ts';

const all = [];

for await (let line of readLines(Deno.stdin)) {
  let [state, coords] = line.split(' ');
  coords = coords.split(',').map((v) => v.split('=')[1].split('..').map(i10));
  all.push([state === 'on' ? 1 : 0, coords]);
}
console.log({ all });

const map = {};

const h = (...args) => args.join('_');

function set(map, [xx, yy, zz], v) {
  for (let z of range(zz[0], zz[1] + 1)) {
    for (let y of range(yy[0], yy[1] + 1)) {
      for (let x of range(xx[0], xx[1] + 1)) {
        if (v) map[h(x, y, z)] = 1;
        else delete map[h(x, y, z)];
      }
    }
  }
}
//set(map, all[0][1], all[0][0]);

for (let line of all) {
  const [xx, yy, zz] = line[1];
  if (
    [xx[0], xx[1], yy[0], yy[1], zz[0], zz[1]]
      .map((v) => Math.abs(v))
      .filter((v) => v > 50).length === 0
  ) {
    console.log({ line });
    set(map, line[1], line[0]);
  } else {
    console.log('---', line);
  }
}

//console.log(map);
console.log(Object.keys(map).length);
