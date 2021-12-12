import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

/*
    start
    /   \
c--A-----b--d
    \   /
     end
*/
const all = [];
const map = {};
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
  const [from, to] = line.split('-');
  //  console.log({ from, to, line });
  if (!map[from]) map[from] = new Set([to]);
  else map[from].add(to);

  if (!map[to]) map[to] = new Set([from]);
  else map[to].add(from);
}
console.log(map);

function walk(G, start) {
  const result = [];
  const stack = [[start, []]];
  while (stack.length) {
    const [head, path] = stack.pop();
    const children = G[head];
    //    console.log({ head, path, children });
    for (let c of children) {
      if (c === 'end') {
        console.log('end', [...path, head, 'end']);
        result.push([...path, head, 'end']);
      } else {
        //        console.log('->', c);
        if (c !== 'start' && (c.match(/[A-Z]+/) || !path.includes(c))) {
          stack.unshift([c, [...path, head]]);
          //          console.log('in', stack[0]);
        } else {
          //          console.log(':(');
        }
      }
    }
  }
  return result;
}
const count = walk(map, 'start');
console.log(count.length);
