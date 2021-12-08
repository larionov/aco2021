import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";

let depth = 0, position = 0, aim = 0;;
//const arr = [];
for await(let line of readLines(Deno.stdin)) {
//    arr.push(line);
    let [dir, val] = line.split(' ');
    switch (dir) {
    case 'forward':
        position += parseInt(val, 10);
        depth += aim * parseInt(val, 10);
        break;
    case 'down': aim+= parseInt(val, 10); break;
    case 'up': aim -= parseInt(val, 10); break;
    }
}

console.log({depth, position, aim}, depth * position);
