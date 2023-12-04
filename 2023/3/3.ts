import { actual as input } from "./input";

type NumberPosition = {
  xStart: number;
  xEnd: number;
  y: number;
};

const checkBoundary = ({ xStart, xEnd, y }: NumberPosition) => {
  // start from the line above
  for (let i = xStart - 1; i <= xEnd + 1; i++) {
    if (checkNodeIsSymbol(i, y - 1)) {
      return true;
    }
  }

  // current line
  if (checkNodeIsSymbol(xStart - 1, y)) {
    return true;
  }
  if (checkNodeIsSymbol(xEnd + 1, y)) {
    return true;
  }

  // line beneath
  for (let i = xStart - 1; i <= xEnd + 1; i++) {
    if (checkNodeIsSymbol(i, y + 1)) {
      return true;
    }
  }

  return false;
};

const checkNodeIsSymbol = (x: number, y: number) => {
  // out of bound
  if (x < 0 || x > xSize - 1 || y < 0 || y > ySize - 1) {
    return false;
  }
//   console.log(`checking line ${y} index ${x}: ${input[y][x]}`);
  return !/^\d|\.$/.test(input[y][x]);
};

const xSize = input.length;
const ySize = input[0].length;

let sum = 0;

for (const [lineNum, line] of input.entries()) {
  const number = /\d+/g;

  let res: RegExpExecArray | null;
  do {
    res = number.exec(line);
    if (res) {
      const { 0: match, index } = res;
      const matchLen = match.length;
      const numPos: NumberPosition = {
        xStart: index,
        xEnd: index + matchLen - 1,
        y: lineNum,
      };
    //   console.log(numPos, match)
      const pass = checkBoundary(numPos);
      if (pass) {
        sum += Number(match);
        // console.log({ lineNum, match });
      }
    }
  } while (res);
}

console.log(sum);
