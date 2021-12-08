import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";

let depth = 0, position = 0;
for await(let line of readLines(Deno.stdin)) {
    let [dir, val] = line.split(' ');
    switch (dir) {
    case 'forward': position += parseInt(val, 10); break;
    case 'down': depth += parseInt(val, 10); break;
    case 'up': depth -= parseInt(val, 10); break;
    }
}

console.log({depth, position}, depth * position);
