import { actual as data } from "./input";

let total = 0;

for (const card of data) {
  let match = 0;
//   console.log(card);

  const [first, resultStr] = card.split("|");
  const [game, winNumStr] = first.split(":");

  const winNum = winNumStr.trim().split(/\s+/).map(Number);
  const resultNum = resultStr.trim().split(/\s+/).map(Number);

  for (const r of resultNum) {
    if (winNum.includes(r)) {
      console.log(r);
      match++;
    }
  }

  if (match > 0) {
    total += Math.pow(2, match - 1);
  }
  console.log(`total: ${match}`);
}

console.log(total);
