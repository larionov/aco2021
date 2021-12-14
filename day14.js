import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
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
const map = slidingWindows(template.split(''), 2).reduce((acc, p) => {
  const pair = p.join('');
  if (!acc[pair]) acc[pair] = 0;
  acc[pair]++;
  return acc;
}, {});
const chars = template.split('').reduce((acc, c) => {
  if (!acc[c]) acc[c] = 0;
  acc[c]++;
  return acc;
}, {});

const process = (m, c, rules) => {
  const map = Object.assign({}, m);
  const add = {};
  const remove = {};
  for (let p of Object.keys(m)) {
    const replacement = rules[p];
    if (m[p]) {
      for (let r of replacement) {
        if (!add[r]) add[r] = 0;
        add[r] += m[p];
      }
      if (!remove[p]) remove[p] = 0;
      remove[p] += m[p];
      if (!c[replacement[0][1]]) c[replacement[0][1]] = 0;
      c[replacement[0][1]] += m[p];
    }
  }
  for (let [a, v] of Object.entries(add)) {
    if (!map[a]) map[a] = 0;
    map[a] += v;
  }
  for (let [a, v] of Object.entries(remove)) {
    if (map[a]) map[a] -= v;
    if (!map[a]) delete map[a];
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
