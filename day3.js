import { readLines } from "https://deno.land/std@0.116.0/io/bufio.ts";

const counts0 = {};
const counts1 = {};
for await(let line of readLines(Deno.stdin)) {
    let bits = line.split('');
    for (let i in bits) {
        if (counts0[i] === undefined) counts0[i] = 0;
        if (counts1[i] === undefined) counts1[i] = 0;
        if (bits[i] === '0') counts0[i]++;
        if (bits[i] === '1') counts1[i]++;
    }
}

let gamma = 0;
let epsilon = 0;
let len = Object.keys(counts0).length;
for (let i = 0; i < len; i++) {
    console.log(i, counts0[i], counts1[i], len - i);
    if (counts0[i] < counts1[i]) {
        gamma += Math.pow(2, len - i - 1);
    } else {
        epsilon+= Math.pow(2, len - i - 1);
    }
}

console.log({counts0, counts1, gamma, epsilon}, gamma * epsilon);
