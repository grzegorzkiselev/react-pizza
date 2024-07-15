import cn from "classnames";
import { FC } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";

const getClassName = ({ className = "", appearance }:
  { className?: string, appearance: ButtonProps["appearance"] })
  : string => {
  return cn(styles["button"], styles["accent"], className, {
    [styles.small]: appearance === "small",
    [styles.big]: appearance === "big",
  });
};

export const Button: FC<ButtonProps> = ({ children, className, appearance = "small", ...props }) => {

  return (
    <button className={getClassName({ className, appearance })} {...props}>
      {children}
    </button>
  );
};