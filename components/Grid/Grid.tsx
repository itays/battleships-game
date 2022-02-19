import React from "react";

type GridProps = {
  type: string;
} & React.HtmlHTMLAttributes<Element>;

const Grid: React.FC<GridProps> = (props) => {
  const { type, ...rest } = props;
  const bg = type === "user" ? "bg-blue-500" : "bg-lime-500";
  return (
    <div className={`flex flex-wrap w-[400px] h-[400px] ${bg}`} {...rest}>
      <div className="w-10 h-10 bg-red-500"></div>
      <div className="w-10 h-10 bg-red-500"></div>
    </div>
  );
};

export default Grid;
