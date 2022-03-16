import React, { useRef } from "react";
import { Grid as GridType, Player } from "../types";
import Cell from "./Cell";

type GridProps = {
  type: Player;
  hits: GridType;
  onCellClick(index: string): void;
  disabled: boolean;
} & React.HtmlHTMLAttributes<Element>;

const Grid: React.FC<GridProps> = (props) => {
  const { type, disabled, hits, onCellClick } = props;
  const squaresContainerEl = useRef<HTMLDivElement | null>(null);

  function renderGridCells() {
    const letters = ["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    return new Array(11).fill(null).map((_, i) => {
      return new Array(11).fill(null).map((_, j) => {
        const key = `${i}${j}`;
        if (i === 0) {
          return <Cell key={key}>{(j && j) || ""}</Cell>;
        } else if (j === 0) {
          return <Cell key={key}>{letters[i]}</Cell>;
        } else {
          const point = `${letters[i]}${j}`;
          const cls = [
            (disabled && "cursor-not-allowed") || "cursor-pointer",
            `hover:bg-yellow-200`,
          ];
          if (hits.has(point)) {
            cls.push(
              (hits.get(point) !== "miss" && "bg-red-600") || "bg-white"
            );
          }
          return (
            <Cell
              key={key}
              title={(disabled && "disabled") || `${point}`}
              className={cls.join(" ")}
              point={point}
            />
          );
        }
      });
    });
  }
  const handleOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const point = (e.target as HTMLDivElement).dataset.point;
    if (!point) return;
    onCellClick(point);
  };

  return (
    <div>
      <h3 className="capitalize">{type} grid</h3>
      <div
        className="game_grid"
        onClick={handleOnClick}
        ref={squaresContainerEl}
      >
        {renderGridCells()}
      </div>
    </div>
  );
};

export default Grid;
