import cn from "classnames";

interface IClassnameConstructorProps {
  className: string;
  hightLightedClass: string;
  isHighlighted: boolean;
  propsClassName?: string
}

export const highlightElement = ({ className, isHighlighted, hightLightedClass, propsClassName = "" }: IClassnameConstructorProps): string => {
  return cn(className, propsClassName, {
    [hightLightedClass]: isHighlighted
  });
};