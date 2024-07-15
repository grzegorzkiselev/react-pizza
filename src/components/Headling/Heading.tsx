import cn from "classnames";
import { FC } from "react";
import { HeadingProps } from "./Heading.props";
import styles from "./Headling.module.css";

export const Heading: FC<HeadingProps> = ({ children, className, ...props }) => {
  return (
    <h1 className={cn(styles.h1, className)}{...props}>{children}</h1>
  );
};