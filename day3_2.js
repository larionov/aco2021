import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

function getBitCounts(arr) {
  let c0 = {};
  let c1 = {};

  for (let num of arr) {
    const bits = num.split('');
    for (let i in bits) {
      if (c0[i] === undefined) c0[i] = 0;
      if (c1[i] === undefined) c1[i] = 0;
      if (bits[i] === '0') c0[i]++;
      if (bits[i] === '1') c1[i]++;
    }
  }
  return { c0, c1 };
}

let arr_o = [];
for await (let line of readLines(Deno.stdin)) {
  arr_o.push(line);
}
let arr_c = [...arr_o];

let i = 0;
while (arr_o.length > 1) {
  const c = getBitCounts(arr_o);
  console.log(arr_o.length, c);
  if (c.c1[i] >= c.c0[i]) {
    console.log('1', arr_o[0][i]);
    arr_o = arr_o.filter((l) => l[i] === '1');
    //    arr_c = arr_c.filter((l) => l[i]);
  } else {
    console.log('0');
    arr_o = arr_o.filter((l) => l[i] === '0');
  }
  i++;
  //  break;
}
console.log(arr_o, parseInt(arr_o[0], 2));
i = 0;
while (arr_c.length > 1) {
  const c = getBitCounts(arr_c);
  console.log(arr_c.length, c);
  if (c.c1[i] < c.c0[i]) {
    console.log('1', arr_c[0][i]);
    arr_c = arr_c.filter((l) => l[i] === '1');
    //    arr_c = arr_c.filter((l) => l[i]);
  } else {
    console.log('0');
    arr_c = arr_c.filter((l) => l[i] === '0');
  }
  i++;
}
console.log(arr_c, parseInt(arr_c[0], 2));
console.log(parseInt(arr_c[0], 2) * parseInt(arr_o[0], 2));
