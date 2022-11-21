import { Grid, Ship, Ships } from "../types";

function randomizeShips() {
  const grid: Grid = new Map();
  const ships: Ship[] = [
    { size: 2, name: Ships.DESTROYER },
    { size: 3, name: Ships.SUBMARINE },
    { size: 3, name: Ships.CRUISER },
    { size: 4, name: Ships.BATTLESHIP },
    { size: 5, name: Ships.CARRIER },
  ];
  for (const ship of ships) {
    placeShip(ship, grid);
  }
  return grid;
}

function placeShip(ship: Ship, grid: Grid): void {
  const dir = (Math.random() > 0.5 && "X") || "Y";
  const start = Math.floor(Math.random() * 100) + 1;
  if (grid.has(numToCoordinates(start))) {
    return placeShip(ship, grid);
  }
  const [row] = getRowCol(start);

  switch (dir) {
    case "X":
      if (canFitLeftToRight(start, ship.size, grid, row)) {
        fitLeftToRight(start, ship, grid);
      } else if (canFitRightToLeft(start, ship.size, grid, row)) {
        fitRightToLeft(start, ship, grid);
      } else {
        placeShip(ship, grid);
      }
      break;

    case "Y":
      if (canFitTopToBottom(start, ship.size, grid, row)) {
        fitTopToBottom(start, ship, grid);
      } else if (canFitBottomToTop(start, ship.size, grid, row)) {
        fitBottomToTop(start, ship, grid);
      } else {
        placeShip(ship, grid);
      }
      break;

    default:
      throw new Error("illegal dir ");
  }
}

function canFitLeftToRight(
  start: number,
  size: number,
  grid: Grid,
  row: number
) {
  if (start + size - 1 > 100) return false; // if out of bounds
  if (start % 10 === 0) return false; // can't start from the right edge
  let [tempRow, col] = getRowCol(start + size - 1); // check for line break
  if (col === 0) tempRow--;
  if (tempRow > row) return false;

  // check if cells are empty
  for (let i = 0; i < size; i++) {
    if (grid.has(numToCoordinates(start + i))) return false;
  }

  return true;
}

function fitLeftToRight(start: number, ship: Ship, grid: Grid) {
  for (let i = 0; i < ship.size; i++) {
    grid.set(numToCoordinates(start + i), ship.name);
  }
}

function canFitRightToLeft(
  start: number,
  size: number,
  grid: Grid,
  row: number
) {
  if (start - size < 0) return false; // if out of bounds
  if (start % 10 === 1) return false; // can't start from the left edge

  const [tempRow] = getRowCol(start - size); // check for line break
  if (tempRow < row) return false;

  // check if cells are empty
  for (let i = 0; i < size; i++) {
    if (grid.has(numToCoordinates(start - i))) return false;
  }
  return true;
}

function fitRightToLeft(start: number, ship: Ship, grid: Grid) {
  for (let i = 0; i < ship.size; i++) {
    grid.set(numToCoordinates(start - i), ship.name);
  }
}

function canFitTopToBottom(
  start: number,
  size: number,
  grid: Grid,
  row: number
) {
  if (row + size > 9) return false; // out of bound

  // check if cells are empty
  for (let i = 0; i < size; i++) {
    if (grid.has(numToCoordinates(start + 10 * i))) return false;
  }

  return true;
}

function fitTopToBottom(start: number, ship: Ship, grid: Grid) {
  for (let i = 0; i < ship.size; i++) {
    grid.set(numToCoordinates(start + 10 * i), ship.name);
  }
}

function canFitBottomToTop(
  start: number,
  size: number,
  grid: Grid,
  row: number
) {
  if (row - size < 0) return false; // out of bound

  // check if cells are empty
  for (let i = 0; i < size; i++) {
    if (grid.has(numToCoordinates(start - 10 * i))) return false;
  }
  return true;
}

function fitBottomToTop(start: number, ship: Ship, grid: Grid) {
  for (let i = 0; i < ship.size; i++) {
    grid.set(numToCoordinates(start - 10 * i), ship.name);
  }
}

function getKey(num: number) {
  return (num < 10 && `0_${num}`) || `${num}`.split("").join("_");
}
function getRowCol(num: number) {
  return getKey(num).split("_").map(Number);
}

function numToCoordinates(num: number) {
  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  if (num === 100) {
    return "J10";
  }
  const [row, col] = getRowCol(num);
  return `${letters[col === 0 ? row - 1 : row]}${(col && col) || 10}`;
}

export default randomizeShips;
