import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';

function print(grid) {
  console.log('');
  const d = { y: 0, Y: grid.length - 1, x: 0, X: grid[0].length - 1 };
  for (let y = d.y; y <= d.Y; y++) {
    const s = [];
    for (let x = d.x; x <= d.X; x++) {
      s.push(grid[y][x]);
    }
    console.log(s.join(''));
  }
  //  console.log(s.map((r) => r.join('')).join('\n'));
}

function neighbors(grid, y, x) {
  const r = [];
  for (let dy = y - 1; dy <= y + 1; ++dy) {
    for (let dx = x - 1; dx <= x + 1; ++dx) {
      if (dx != x || dy != y) {
        if (
          dx >= 0 &&
          dy >= 0 &&
          dx <= grid[0].length - 1 &&
          dy <= grid.length - 1
        )
          r.push([dx, dy]);
      }
    }
  }
  return r;
}

function scan(grid) {
  let counter = 0;
  const flash = ([i, j]) => {
    //    console.log({ i, j }, grid[i][j], n.length);
    grid[i][j] = '*';
    const n = neighbors(grid, i, j);
    counter++;
    //    print(grid);
    const toFlash = [];
    for (let [x, y] of n) {
      if (grid[y][x] === '*') continue;
      // console.log('scanning', { x, y });
      grid[y][x]++;
      if (grid[y][x] > 9) {
        //toFlash.push([x, y]);
        flash([y, x]);
      }
    }
    for (let [x, y] of toFlash) {
      //flash([y, x]);
    }
    //    console.log(n);
  };

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j]++;
    }
  }
  //  print(grid);

  // flash
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] > 9) {
        flash([i, j]);
      }
    }
  }

  //reset;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '*') {
        grid[i][j] = 0;
      }
    }
  }

  //print(all);
  return counter;
}
const checkZero = (grid) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] !== 0) {
        return false;
      }
    }
  }
  return true;
};
const all = [];
for await (let line of readLines(Deno.stdin)) {
  all.push(line.split('').map((v) => parseInt(v, 10)));
}
console.log('\nbefore:');
print(all);
let sum = 0;
for (let i = 1; i <= 10000; i++) {
  const count = scan(all);
  sum += count;
  console.log('\nstep ', i, ': ', count, sum);
  print(all);
  if (checkZero(all)) break;
}
//console.log({ all });

/*

Before any steps:
5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526

After step 1:
6594254334
3856965822
6375667284
7252447257
7468496589
5278635756
3287952832
7993992245
5957959665
6394862637

After step 2:
8807476555
5089087054
8597889608
8485769600
8700908800
6600088989
6800005943
0000007456
9000000876
8700006848

After step 3:
0050900866
8500800575
9900000039
9700000041
9935080063
7712300000
7911250009
2211130000
0421125000
0021119000

After step 4:
2263031977
0923031697
0032221150
0041111163
0076191174
0053411122
0042361120
5532241122
1532247211
1132230211

After step 5:
4484144000
2044144000
2253333493
1152333274
1187303285
1164633233
1153472231
6643352233
2643358322
2243341322

After step 6:
5595255111
3155255222
3364444605
2263444496
2298414396
2275744344
2264583342
7754463344
3754469433
3354452433

After step 7:
6707366222
4377366333
4475555827
3496655709
3500625609
3509955566
3486694453
8865585555
4865580644
4465574644

After step 8:
7818477333
5488477444
5697666949
4608766830
4734946730
4740097688
6900007564
0000009666
8000004755
6800007755

After step 9:
9060000644
7800000976
6900000080
5840000082
5858000093
6962400000
8021250009
2221130009
9111128097
7911119976

After step 10:
0481112976
0031112009
0041112504
0081111406
0099111306
0093511233
0442361130
5532252350
0532250600
0032240000
*/
