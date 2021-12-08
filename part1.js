import input1 from './input1_1.js';

let input = input1;
console.log(input1);
let prev1 = input[0];
let prev2 = input[1];
let prev3 = input[2];
let count = 0;
for (let i = 3 ; i< input.length; i++) {
    const suma = prev1 + prev2 + prev3;
    const sumb = prev2 + prev3 + input[i];
    if (suma < sumb) count++;
//    console.log({prev1, prev2, prev3}, input[i], {suma, sumb});
    prev1 = prev2;
    prev2 = prev3;
    prev3 = input[i];
}
console.log(count);
