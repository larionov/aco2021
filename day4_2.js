import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}

const numbers = all[0].split(',').map((n) => parseInt(n, 10));
let boards = all
  .splice(2)
  .join('\n')
  .split('\n\n')
  .map((board) =>
    board.split('\n').map((r) =>
      r
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n, 10)),
    ),
  );

console.log({ numbers, boards });
const marked = {};
function checkBoard(board, marked) {
  for (let j = 0; j < board[0].length; j++) {
    let rowC = 0;
    for (let i = 0; i < board.length; i++) {
      //      console.log('---', i, j, marked[board[i][j]], board[i][j]);
      if (marked[board[i][j]]) rowC++;
    }
    if (rowC === board.length) return true;
  }
  for (let i = 0; i < board.length; i++) {
    let colC = 0;
    for (let j = 0; j < board[0].length; j++) {
      if (marked[board[i][j]]) colC++;
    }
    if (colC === board[0].length) return true;
  }
  return false;
}
function sum(board, marked) {
  let s = 0;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (!marked[board[i][j]]) s += board[i][j];
    }
  }
  return s;
}

for (let i = 0; i < numbers.length; i++) {
  const n = numbers[i];
  marked[n] = true;
  const winner = boards.filter((b) => checkBoard(b, marked))[0];
  boards = boards.filter((b) => !checkBoard(b, marked));
  console.log('-------', { boards });
  if (boards.length === 0) {
    console.log({ winner }, sum(winner, marked), n, sum(winner, marked) * n);
    break;
  }
}
