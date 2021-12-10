import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

function check(line) {
  //  const counts = { '[': 0, '(': 0, '{': 0, '<': 0 };
  const stack = [];
  for (let i = 0; i < line.length; i++) {
    //    console.log({ i, stack });
    if ('[{(<'.indexOf(line[i]) !== -1) {
      stack.push(line[i]);
    } else {
      const top = stack.pop();
      //      console.log({ top }, line[i]);
      switch (line[i]) {
        case ']':
          if (top !== '[') return 0; //57;
          break;
        case '}':
          if (top !== '{') return 0; //1197;
          break;
        case ')':
          if (top !== '(') return 0; //3;
          break;
        case '>':
          if (top !== '<') return 0; //25137;
          break;
      }
    }
  }
  const score = { '(': 1, '[': 2, '{': 3, '<': 4 };
  stack.reverse();
  return stack.reduce((acc, v, i) => {
    return acc * 5 + score[v];
  }, 0);
  //  console.log(counts);
}
const all = [];
let sum = 0;
for await (let line of readLines(Deno.stdin)) {
  const err = check(line);
  if (err) all.push(err);
  console.log(line, err);
  //  sum += err;
  //  all.push(line);
}
all.sort((a, b) => a - b);
console.log(all.length, all.length / 2);
console.log(all, all[(all.length - 1) / 2]);
