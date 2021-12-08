import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import {
  intersection,
  union,
  difference,
} from 'https://deno.land/x/set_operations/mod.ts';

function sort(s) {
  const a = s.split('');
  a.sort();
  return a.join('');
}

let count = 0;
for await (let line of readLines(Deno.stdin)) {
  const [digits, num] = line.split(' | ').map((l) => l.split(' ').map(sort));
  const eight = new Set(digits.find((v) => v.length === 7));
  const one = new Set(digits.find((v) => v.length === 2));
  const seven = new Set(digits.find((v) => v.length === 3));
  const four = new Set(digits.find((v) => v.length === 4));

  const seg0 = difference(seven, one);
  const fourMinusOne = difference(four, one);
  const seg3 = [
    ...intersection(
      ...digits.filter((d) => d.length === 5).map((d) => new Set(d)),
    ),
  ].join('');

  const five = digits
    .filter((v) => v.length === 5)
    .find((v) => intersection(new Set(v), fourMinusOne).size === 2);

  const nine = sort([...union(five, one)].join(''));
  const zero = digits.find(
    (d) => d.length === 6 && intersection(new Set(d), fourMinusOne).size === 1,
  );
  const six = digits.find((d) => d.length === 6 && d !== nine && d !== zero);

  const seg4 = [...difference(eight, nine)].join('');
  const two = digits.find(
    (d) => d.length === 5 && d !== five && d.indexOf(seg4) >= 0,
  );
  const three = digits.find((d) => d.length === 5 && d !== five && d !== two);

  const cifer = [
    zero,
    one,
    two,
    three,
    four,
    five,
    six,
    seven,
    eight,
    nine,
  ].reduce((acc, v, i) => {
    acc[sort([...v].join(''))] = i;
    return acc;
  }, {});

  const decoded = num.map((v) => cifer[v]);
  const n = decoded[0] * 1000 + decoded[1] * 100 + decoded[2] * 10 + decoded[3];
  count += n;
  console.log({ decoded, n });
}

console.log({ count });
