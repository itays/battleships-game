import React, { memo } from "react";

export type CellProps = {
  className?: string;
  point?: string;
  title?: string;
};

const Cell: React.FC<any> = ({ className, point, title, children }) => {
  const baseClass = `w-10 h-10 border border-dashed bg-blue-500 grid place-items-center text-white font-bold`;
  const _className = [baseClass, className].join(" ");
  const props = {
    className: _className,
    "data-point": (point && point) || null,
    title,
  };
  return <div {...props}>{children}</div>;
};

export default memo(Cell);
