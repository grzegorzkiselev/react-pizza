import { forwardRef } from "react";
import { highlightElement } from "../../helpers/Classnames";
import styles from "./Search.module.css";
import { SearchProps } from "./Search.props";

export const Search = forwardRef<HTMLInputElement, SearchProps>(({ isValid = true, className, ...props }, ref) => {

  return (
    <div className={styles["input-wrapper"]}>
      <input ref={ref} className={
        highlightElement({ className: styles.input, isHighlighted: !isValid, hightLightedClass: styles.invalid, propsClassName: className })
      } {...props} />
      <img className={styles.icon} src="/search-icon.svg" alt="Иконка лупы" />
    </div>
  );
});
