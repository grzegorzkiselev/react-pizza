import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../store/cart.slice";
import { AppDispatch } from "../../store/store";
import styles from "./ProductCard.module.css";
import { ProductCardProps } from "./ProductCard.props";

export const ProductCard: FC<ProductCardProps> = (props) => {
  const dispatch = useDispatch();

  const add = (event: MouseEvent) => {
    event.preventDefault();
    dispatch<AppDispatch>(addItemToCart(props.id));
  };

  return (
    <Link to={`/product/${props.id}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.head} style={{ backgroundImage: `url(${props.image})` }}>
          <div className={styles.price}>
            {props.price}
            <span className={styles.currency}>&nbsp;₽</span>
          </div>
          <button className={styles["add-to-cart"]} onClick={add}>
            <img src="/cart-button-icon.svg" alt="Добавить в корзину" />
          </button>
          <div className={styles.rating}>
            {props.rating}
            <img src="/star-icon.svg" alt="Иконка звезды" />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.title}>{props.title}</div>
          <div className={styles.description}>{props.description}</div>
        </div>
      </div>
    </Link>
  );
};
