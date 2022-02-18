import React from "react";
import styles from "./Grid.module.css";
console.log(styles);

type GridProps = {
  type: string;
} & React.HtmlHTMLAttributes<Element>;

const Grid: React.FC<GridProps> = (props) => {
  const { type, ...rest } = props;
  return (
    <div className={[styles.grid, styles[`grid_${type}`]].join(" ")} {...rest}>
      <div className={styles.grid_item}></div>
      <div className={styles.grid_item}></div>
    </div>
  );
};

export default Grid;
