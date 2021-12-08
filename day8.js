import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

const length_code = {
  2: 1,
  3: 7,
  4: 4,
  7: 8,
};
const all = [];
let count = 0;
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
  const [digits, num] = line.split(' | ').map((l) =>
    l.split(' ').map((t) => {
      const r = t.split('');
      r.sort();
      return r.join('');
    }),
  );
  const d = digits.reduce(
    (acc, v) => ((acc[v] = length_code[v.length]), acc),
    {},
  );

  const decoded = num.map((v) => {
    //    console.log({ d, v });
    return d[v];
  });
  count += decoded.filter(Boolean).length;

  console.log({ digits, num, d, decoded });
}

console.log({ all, count });
