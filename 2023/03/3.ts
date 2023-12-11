import { actual as input } from "./input";

type NumberPosition = {
  value: number;
  xStart: number;
  xEnd: number;
  y: number;
};

const gearLog: Record<number, Record<number, number[]>> = {};

const checkBoundary = ({ xStart, xEnd, y, value }: NumberPosition) => {
  // start from the line above
  for (let i = xStart - 1; i <= xEnd + 1; i++) {
    if (checkNodeIsSymbol(i, y - 1, value)) {
      return true;
    }
  }

  // current line
  if (checkNodeIsSymbol(xStart - 1, y, value)) {
    return true;
  }
  if (checkNodeIsSymbol(xEnd + 1, y, value)) {
    return true;
  }

  // line beneath
  for (let i = xStart - 1; i <= xEnd + 1; i++) {
    if (checkNodeIsSymbol(i, y + 1, value)) {
      return true;
    }
  }

  return false;
};

const checkNodeIsSymbol = (x: number, y: number, value: number) => {
  // out of bound
  if (x < 0 || x > xSize - 1 || y < 0 || y > ySize - 1) {
    return false;
  }
  //   console.log(`checking line ${y} index ${x}: ${input[y][x]}`);
  //   return !/^\d|\.$/.test(input[y][x]);

  if (input[y][x] === "*") {
    gearLog[x] ??= {};
    gearLog[x][y] ??= [];
    gearLog[x][y].push(value);
  }

  return false;
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
        value: Number(match),
        xStart: index,
        xEnd: index + matchLen - 1,
        y: lineNum,
      };
      //   console.log(numPos, match)
      checkBoundary(numPos);
      //   if (pass) {
      //     sum += Number(match);
      // console.log({ lineNum, match });
      //   }
    }
  } while (res);
}

// console.log(gearLog);

for (const [x, lineMap] of Object.entries(gearLog)) {
  for (const [y, numbers] of Object.entries(lineMap)) {
    if (numbers.length === 2) {
      sum += numbers[0] * numbers[1];
    }
  }
}

console.log(sum);
