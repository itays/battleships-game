import React, { useEffect, useRef, useState } from "react";

type GridProps = {
  type: string;
} & React.HtmlHTMLAttributes<Element>;

const Grid: React.FC<GridProps> = (props) => {
  const { type, ...rest } = props;
  const squaresContainerEl = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    console.log(squaresContainerEl.current);
  }, []);

  function renderGridCells() {
    return new Array(100)
      .fill(null)
      .map((_, index) => (
        <div
          key={index}
          data-test={`grid_cell_${index}`}
          data-index={`${index + 1}`}
          className="w-10 h-10 border border-dashed cursor-pointer"
        />
      ));
  }

  return (
    <div>
      <h3 className="capitalize">{type} grid</h3>
      <div
        className={`grid grid-cols-10 w-[400px] h-[400px] bg-blue-500`}
        {...rest}
        ref={squaresContainerEl}
      >
        {renderGridCells()}
      </div>
    </div>
  );
};

export default Grid;
