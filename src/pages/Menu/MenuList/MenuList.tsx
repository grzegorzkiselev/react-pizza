import { FC } from "react";
import { ProductCard } from "../../../components/ProductCard/ProductCard";
import { IProduct } from "../../../interfaces/product.interface";
import styles from "./MenuList.module.css";
import { MenuListProps } from "./MenuList.props";

export const MenuList: FC<MenuListProps> = ({ products }) => {

  return <div className={styles.wrapper}>
    {
      products.map((product: IProduct) => (
        <ProductCard key={product.id}
          id={product.id}
          title={product.name}
          description={product.ingredients.join(", ")}
          image={product.image}
          price={product.price}
          rating={product.rating}
        />
      ))
    }
  </div>;
};
