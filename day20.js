import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { union } from 'https://deno.land/x/set_operations/mod.ts';
import { permutationsWithReplacement } from 'https://deno.land/x/combinatorics/mod.ts';

console.log('----------------');
const all = [];
const i10 = (v) => parseInt(v, 10);
const i2 = (v) => parseInt(v, 2);

function print(state) {
  const d = dim;
  console.log({ d });
  for (let y = d.y - 2; y <= d.Y + 2; y++) {
    const s = [];
    for (let x = d.x - 2; x <= d.X + 2; x++) {
      s.push(get(state, y, x) === '#' ? '#' : '.');
    }
    console.log(s.join(''));
  }
}
function h(...args) {
  return args.join('_');
}

function neighbors(y, x) {
  const r = [];
  for (let dy = y - 1; dy <= y + 1; ++dy) {
    for (let dx = x - 1; dx <= x + 1; ++dx) {
      r.push([dy, dx]);
    }
  }
  return r;
}

for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}
let [code, imageText] = all.join('\n').split('\n\n');
console.log({ code, imageText });

const image = {};
let i = 0;
let j = 0;
for (let line of imageText.split('\n')) {
  j = 0;
  for (let c of line.split('')) {
    if (c === '#') image[h(i, j)] = c;
    j++;
  }
  i++;
}
let dim = { x: 0, y: 0, X: j, Y: i };
let infColor = '.';

function get(image, y, x) {
  const d = dim;
  if (y > d.Y || y < d.y || x < d.x || x > d.X) return infColor;

  return image[h(y, x)];
}

function enhance(image, code) {
  const newImage = {};
  const d = dim;

  for (let i = d.y - 1; i <= d.Y + 1; i++) {
    for (let j = d.x - 1; j <= d.X + 1; j++) {
      const pxlb = neighbors(i, j)
        .map(([y, x]) => (get(image, y, x) === '#' ? '1' : '0'))
        .join('');
      const pxl = i2(pxlb);
      //console.log({ i, j, pxl, pxlb }, code[pxl], pxl);
      if (code[pxl] === '#') newImage[h(i, j)] = code[pxl];
    }
  }
  dim = { x: dim.x - 1, y: dim.y - 1, X: dim.X + 1, Y: dim.Y + 1 };
  infColor = code[infColor === '#' ? 511 : 0];
  console.log('new infcolor', infColor);
  return newImage;
}

let newImage = image;
print(newImage, 0);
for (let i = 0; i < 2; i++) {
  console.log('Step: ', i);
  newImage = enhance(newImage, code, i);
  //print(newImage, i);
}
console.log('part1', Object.keys(newImage).length);

newImage = image;
print(newImage, 0);
for (let i = 0; i < 50; i++) {
  console.log('Step: ', i);
  newImage = enhance(newImage, code, i);
  //print(newImage, i);
}
console.log('part2', Object.keys(newImage).length);
