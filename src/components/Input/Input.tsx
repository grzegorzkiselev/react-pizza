import { forwardRef } from "react";
import { highlightElement } from "../../helpers/Classnames";
import styles from "./Input.module.css";
import { InputProps } from "./Input.props";

export const Input = forwardRef<HTMLInputElement, InputProps>(({ isValid, className, ...props }: InputProps, ref) => {
  return (
    <input ref={ref} className={
      highlightElement({ className: styles.input, isHighlighted: !isValid, hightLightedClass: styles.invalid, propsClassName: className })
    } {...props} />
  );
});
