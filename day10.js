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
      console.log({ top }, line[i]);
      switch (line[i]) {
        case ']':
          if (top !== '[') return 57;
          break;
        case '}':
          if (top !== '{') return 1197;
          break;
        case ')':
          if (top !== '(') return 3;
          break;
        case '>':
          if (top !== '<') return 25137;
          break;
      }
    }
  }
  return 0;
  console.log(counts);
}
const all = [];
let sum = 0;
for await (let line of readLines(Deno.stdin)) {
  const err = check(line);
  console.log(line, err);
  sum += err;
  all.push(line);
}
console.log({ sum });
