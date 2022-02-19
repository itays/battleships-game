import React from "react";

export type ShipProps = {
  shipName: string;
  size: number;
  bg: string;
} & React.HtmlHTMLAttributes<Element>;

export const Ship: React.FC<ShipProps> = (props) => {
  const { shipName, size, bg } = props;
  function renderShipCells() {
    return new Array(size)
      .fill(null)
      .map((_, index) => (
        <div key={index} id={`${shipName}_${index}`} className="w-10 h-10" />
      ));
  }
  return (
    <div
      data-test={shipName}
      className={`flex m-3 h-[40px] ${bg} inline-flex`}
      draggable
    >
      {renderShipCells()}
    </div>
  );
};

export default Ship;
