import { actual as data } from "./input";

let total = 0;

const copies: Record<number, number> = {};
const bumpI = (baseI: number, span: number) => {
  for (let i = baseI + 1; i <= baseI + span; i++) {
    if (i > data.length - 1) {
      return;
    }
    // console.log(`${baseI}, ${i}, ${span}`);
    if (copies[i] === undefined) {
      copies[i] = 1;
    } else {
      copies[i]++;
    }
  }
};
const getI = (i: number) => {
  return copies[i] ?? 0;
};

for (const [i, card] of data.entries()) {
  let match = 0;
  //   console.log(card);

  const [first, resultStr] = card.split("|");
  const [game, winNumStr] = first.split(":");

  const winNum = winNumStr.trim().split(/\s+/).map(Number);
  const resultNum = resultStr.trim().split(/\s+/).map(Number);

  for (const r of resultNum) {
    if (winNum.includes(r)) {
      //   console.log(r);
      match++;
    }
  }

  const score = match === 0 ? 0 : Math.pow(2, match - 1);

  const repeat = getI(i);
//   console.log(`${i} (${repeat} copies) total: ${match} ${score}`);

  if (match > 0) {
    for (let repeatI = 0; repeatI < repeat + 1; repeatI++) {
      total += Math.pow(2, match - 1);
      bumpI(i, match);
    }
  }

//   console.log(`subtotal ${total}`);
}

console.log(copies);
console.log(
  Object.values(copies).reduce((prev, cur) => prev + cur, 0) + data.length
);
// console.log(total);
