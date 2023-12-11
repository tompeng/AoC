const fs = require("fs");
const readline = require("readline");

const LIMIT = {
  red: 12,
  green: 13,
  blue: 14,
};

const findColorMax = (s, color) => {
  const redRegex = new RegExp(`([0-9]+) ${color}`, "g");
  let max = 0;
  do {
    m = redRegex.exec(s);
    if (m) {
      const count = Number(m[1]);
      if (count > max) {
        max = count;
      }
    }
  } while (m);
  return max;
};

const checkLine = (line) => {
  for (const [color, limit] of Object.entries(LIMIT)) {
    if (findColorMax(line, color) > limit) {
      return false;
    }
  }
  return true;
};

const getPower = (line) => {
  let power = 1;
  for (color in LIMIT) {
    power *= findColorMax(line, color);
  }
  return power;
};

async function processLineByLine() {
  const fileStream = fs.createReadStream("./2023/2/input.txt");

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let gameIndex = 0;
  let totalGameIndex = 0;
  let totalPower = 0;
  for await (const line of rl) {
    gameIndex++;

    // Each line in input.txt will be successively available here as `line`.
    if (checkLine(line)) {
      // console.log(line);
      totalGameIndex += gameIndex;
    }

    totalPower += getPower(line);
  }

  console.log(totalGameIndex);
  console.log(totalPower);
}

processLineByLine();
