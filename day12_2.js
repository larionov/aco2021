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

/*
start,A,b,A,b,A,c,A,end
start,A,b,d,b,A,c,A,end
start,A,c,A,c,A,b,A,end
start,A,c,A,c,A,b,end
start,b,A,b,A,c,A,end
start,b,d,b,A,c,A,end
*/
console.log(map);
function hasTwiceVisitedSmallCave(path) {
  const vis = {};
  for (let c of path.filter((v) => v.match(/[a-z]+/))) {
    if (!vis[c]) {
      vis[c] = true;
      //console.log(path.filter((v) => v.match(/[a-z]+/)));
    } else return true;
  }
  return false;
}
function walk(G, start) {
  const result = [];
  const stack = [[start, []]];
  while (stack.length) {
    const [head, path] = stack.pop();
    const children = G[head];
    //    console.log({ head, children }, path.join(' '));
    for (let c of children) {
      if (c === 'end') {
        console.log([...path, head, 'end'].join(','));
        result.push([...path, head, 'end']);
      } else {
        if (c === 'start') continue;
        if (c.match(/[A-Z]+/)) {
          stack.unshift([c, [...path, head]]);
        } else if (
          c.match(/[a-z]+/) &&
          !hasTwiceVisitedSmallCave([...path, head])
        ) {
          stack.unshift([c, [...path, head]]);
        } else if (
          c.match(/[a-z]+/) &&
          hasTwiceVisitedSmallCave([...path, head]) &&
          ![...path, head].includes(c)
        ) {
          stack.unshift([c, [...path, head]]);
        }
      }
    }
  }
  return result;
}
const count = walk(map, 'start').map((v) => v.join(','));
console.log(count.length);
