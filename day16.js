import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';

// const objAdd = (o, p, v) => {
//   if (o[p] === undefined) o[p] = 0;
//   o[p] += v;
// };
// const objSub = (o, p, v) => {
//   o[p] -= v;
//   if (o[p] == 0) delete o[p];
// };
const hex = {
  0: '0000',
  1: '0001',
  2: '0010',
  3: '0011',
  4: '0100',
  5: '0101',
  6: '0110',
  7: '0111',
  8: '1000',
  9: '1001',
  A: '1010',
  B: '1011',
  C: '1100',
  D: '1101',
  E: '1110',
  F: '1111',
};

const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}
const message = all[0];
//const message = 'EE00D40C823060';
//const message = '38006F45291200';
//const message = 'EE00D40C823060';
//const message = '8A004A801A8002F478';
//const message = '620080001611562C8802118E34';
//const message = 'A0016C880162017C3686B18A3D4780';
//const message = 'C0015000016115A2E0802F182340';

console.log({ message });
const binMessage = message
  .split('')
  .map((v) => hex[v])
  .join('');

let verGlobal = 0;
console.log(binMessage.length);
const result = parse(binMessage, 0);

console.log({ verGlobal, result });
function parse(bin) {
  let i = 0;
  console.log('PARSE');
  console.log(bin);
  const V = bin.substring(i, i + 3);
  verGlobal += parseInt(V, 2);
  const T = bin.substring(i + 3, i + 3 + 3);
  if (V === '' || T === '') {
    console.log('BREAK');
    return;
  }
  i += 6;
  console.log({ V, T, version: parseInt(V, 2) });
  let value = null;
  if (T === '100') {
    // LITERAL
    const nums = [];
    while (1) {
      let marker = bin[i];
      nums.push(bin.substring(i + 1, i + 5));
      i += 5;
      if (marker === '0') break;
    }
    //i += nums.length % 4;
    value = parseInt(nums.join(''), 2);
    console.log('LITERAL', { i, nums, value });
  } else {
    // OPERATOR
    const I = bin.substring(i, i + 1);
    let L;
    i++;
    console.log('OPERATOR', { I });
    const values = [];
    if (I === '0') {
      L = parseInt(bin.substring(i, i + 15), 2);
      i += 15;
      let subI = 0;
      while (subI < L - 2) {
        const [len, val] = parse(bin.substring(i + subI));
        values.push(val);
        subI += len;
      }
      i += L;
    } else {
      L = parseInt(bin.substring(i, i + 11), 2);
      console.log('OP 3', { L });
      i += 11;
      for (let p = 0; p < L; p++) {
        const [len, val] = parse(bin.substring(i));
        values.push(val);
        console.log({ len });
        i += len;
      }
    }
    const type = parseInt(T, 2);
    console.log({ type, values });
    if (type === 0) {
      // SUM
      value = values.reduce((acc, v) => acc + v, 0);
    } else if (type === 1) {
      // prod
      value = values.reduce((acc, v) => acc * v, 1);
    } else if (type === 2) {
      // min
      value = Math.min(...values);
    } else if (type === 3) {
      // max
      value = Math.max(...values);
    } else if (type === 5) {
      // gt
      value = values[0] > values[1] ? 1 : 0;
    } else if (type === 6) {
      // lt
      value = values[0] < values[1] ? 1 : 0;
    } else if (type === 7) {
      // eq
      value = values[0] === values[1] ? 1 : 0;
    }
  }
  console.log('<-PARSE', { T, V, value });
  return [i, value];
}
