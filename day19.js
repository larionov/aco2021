import { readLines } from 'https://deno.land/std@0.116.0/io/bufio.ts';
import { range } from 'https://deno.land/x/it_range@v1.0.3/range.mjs';
import { slidingWindows } from 'https://deno.land/std@0.116.0/collections/mod.ts';
import count from 'https://deno.land/x/denodash@0.1.3/src/collection/count.ts';
import { union } from 'https://deno.land/x/set_operations/mod.ts';

import { permutationsWithReplacement } from 'https://deno.land/x/combinatorics/mod.ts';

function rotate(points, pitch, roll, yaw) {
  var cosa = Math.cos(yaw);
  var sina = Math.sin(yaw);

  var cosb = Math.cos(pitch);
  var sinb = Math.sin(pitch);

  var cosc = Math.cos(roll);
  var sinc = Math.sin(roll);

  var Axx = cosa * cosb;
  var Axy = cosa * sinb * sinc - sina * cosc;
  var Axz = cosa * sinb * cosc + sina * sinc;

  var Ayx = sina * cosb;
  var Ayy = sina * sinb * sinc + cosa * cosc;
  var Ayz = sina * sinb * cosc - cosa * sinc;

  var Azx = -sinb;
  var Azy = cosb * sinc;
  var Azz = cosb * cosc;

  return points.map((p) => {
    var px = p[0];
    var py = p[1];
    var pz = p[2];

    return [
      Math.round(Axx * px + Axy * py + Axz * pz),
      Math.round(Ayx * px + Ayy * py + Ayz * pz),
      Math.round(Azx * px + Azy * py + Azz * pz),
    ];
  });
}

const inv = (v) => -v;

//console.log({ rotate });

const all = [];

for await (let line of readLines(Deno.stdin)) {
  all.push(line);
}

const scanners = all
  .join('\n')
  .split('\n\n')
  .map((v) =>
    v
      .split('\n')
      .slice(1)
      .map((c) => c.split(',').map((x) => parseInt(x, 10))),
  );
//console.log({ scanners });

const allRotations = [...permutationsWithReplacement([0, 1, 2, 3], 3)].map(
  (r) => r.map((d) => (d * Math.PI) / 2),
);
// const allRotations = [
//   [0, 0, 0],
//   [1, 0, 0],
//   [2, 0, 0],
//   [3, 0, 0],
//   [0, 1, 0],
//   [1, 1, 0],
//   [2, 1, 0],
//   [3, 1, 0],
//   [0, 2, 0],
//   [1, 2, 0],
//   [2, 2, 0],
//   [3, 2, 0],
//   [0, 3, 0],
//   [1, 3, 0],
//   [2, 3, 0],
//   [3, 3, 0],
//   [0, 0, 1],
//   [1, 0, 1],
//   [2, 0, 1],
//   [3, 0, 1],
//   [0, 0, 3],
//   [1, 0, 3],
//   [2, 0, 3],
//   [3, 0, 3],
// ].map((r) => r.map((d) => (d * Math.PI) / 2));
//       .map((r) =>
//   r.map((d) => (d * Math.PI) / 2),
// );

console.log({ allRotations }, allRotations.length);

function translateP(p, d) {
  return p.map((v, i) => v + d[i]);
}
function translatePoints(points, d) {
  return points.map((v) => translateP(v, d));
}

function sort(a1) {
  let a = [...a1];
  a.sort((x, y) => x[0] - y[0]);
  return a;
}
function diffArray(a1, a2) {
  return a1.map((p, i) => p - a2[i]);
}
function addArray(a1, a2) {
  return a1.map((p, i) => p + a2[i]);
}

const h = (v) => v.join(':');
const found = [{ id: '0', p: [0, 0, 0], sc: scanners[0] }];
for (let { sc: sn } of found) {
  for (let scanId in scanners) {
    //console.log({ scanId }, found.length);
    const scan = scanners[scanId];
    if (!found.map((v) => v.id).includes(scanId)) {
      for (let r of allRotations) {
        const rotated = rotate(scan, ...r);
        const diffs = {};
        for (let i = 0; i < sn.length; i++) {
          for (let j = 0; j < rotated.length; j++) {
            const move = diffArray(sn[i], rotated[j]);
            diffs[h(move)] = diffs[h(move)] ? diffs[h(move)] + 1 : 1;
          }
        }
        const foundHere = Object.entries(diffs).filter(([k, v]) => v >= 12);
        //console.log({ foundHere });
        for (let f of foundHere) {
          const fp = f[0].split(':').map((v) => parseInt(v, 10));
          console.log({ fp });
          found.push({
            id: scanId,
            p: fp,
            sc: rotated.map((v) => addArray(v, fp)),
          });
          break;
        }
        if (foundHere.length) break;
      }
    }
  }
}

console.log({ found }, found.length);
let s = new Set();
let maxDist = 0;
for (const { p: fp1, sc: points } of found) {
  s = union(s, new Set(points.map(h)));
  for (const { p: fp2 } of found) {
    console.log({ fp1, fp2 });
    maxDist = Math.max(maxDist, dist([fp2, fp1]));
  }
}

function dist([a, b]) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]);
}

console.log('part 1', s.size);
console.log('part 2', maxDist);
