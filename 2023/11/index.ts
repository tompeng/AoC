import { actual as data } from "./data";

const rowIsEmpty = Array(data.length).fill(true);
const colIsEmpty = Array(data[0].length).fill(true);

type Location = [number, number];
const galaxyLocations: Location[] = [];

for (const [rowI, row] of data.entries()) {
  for (let colI = 0; colI < row.length; colI++) {
    const cellIsEmpty = row[colI] === ".";

    if (!cellIsEmpty) {
      galaxyLocations.push([rowI, colI]);

      if (rowIsEmpty[rowI]) {
        rowIsEmpty[rowI] = false;
      }

      if (colIsEmpty[colI]) {
        colIsEmpty[colI] = false;
      }
    }
  }
}

const getSteps = (from: Location, to: Location) => {
  const fromRow = Math.min(from[0], to[0]);
  const toRow = Math.max(from[0], to[0]);
  const emptyRowsCount = rowIsEmpty
    .slice(fromRow, toRow)
    .filter(Boolean).length;
  const rowDiff = toRow - fromRow + emptyRowsCount;
  //   console.log({
  //     fromRow,
  //     toRow,
  //     emptyRowsCount,
  //     rowDiff,
  //   });

  const fromCol = Math.min(from[1], to[1]);
  const toCol = Math.max(from[1], to[1]);
  const emptyColCount = colIsEmpty.slice(fromCol, toCol).filter(Boolean).length;
  const colDiff = toCol - fromCol + emptyColCount;
  //   console.log({
  //     fromCol,
  //     toCol,
  //     emptyColCount,
  //     colDiff,
  //   });

  return rowDiff + colDiff;
};

console.log(galaxyLocations);

let total = 0;
let pairCount = 0;
for (let i = 0; i < galaxyLocations.length; i++) {
  for (let j = i + 1; j < galaxyLocations.length; j++) {
    pairCount++;
    const steps = getSteps(galaxyLocations[i], galaxyLocations[j]);
    // console.log({ i, j, steps });
    total += steps;
  }
}
console.log({
  pairCount,
  total,
});
