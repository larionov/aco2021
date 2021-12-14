import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';

const objAdd = (o, p, v) => {
  if (o[p] === undefined) o[p] = 0;
  o[p] += v;
};
const objSub = (o, p, v) => {
  o[p] -= v;
  if (o[p] == 0) delete o[p];
};

const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}
const [[template], rulesText] = all
  .join('\n')
  .split('\n\n')
  .map((v) => v.split('\n'));
console.log({ rulesText });
const rules = rulesText.reduce((acc, v) => {
  const [pair, res] = v.split(' -> ');
  const [f, l] = pair.split('');
  acc[pair] = [
    [f, res],
    [res, l],
  ].map((s) => s.join(''));
  return acc;
}, {});

const map = count(slidingWindows(template.split(''), 2).map((v) => v.join('')));
const chars = count(template.split(''));

const process = (m, c, rules) => {
  const map = Object.assign({}, m);
  const add = {};
  const remove = {};
  for (let p of Object.keys(m)) {
    const replacement = rules[p];
    if (m[p]) {
      for (let r of replacement) {
        objAdd(add, r, m[p]);
      }
      objAdd(remove, p, m[p]);
      objAdd(c, replacement[0][1], m[p]);
    }
  }
  for (let [a, v] of Object.entries(add)) {
    objAdd(map, a, v);
  }
  for (let [a, v] of Object.entries(remove)) {
    objSub(map, a, v);
  }
  return map;
};
let m = map;
for (let i of range(0, 40)) {
  console.log('============= Step: ', i + 1);
  m = process(m, chars, rules);
  console.log({ m, chars });
}

const max = Math.max(...Object.values(chars));
const min = Math.min(...Object.values(chars));
console.log({ max, min }, max - min);
