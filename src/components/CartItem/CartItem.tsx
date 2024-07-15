import { FC } from "react";
import { useDispatch } from "react-redux";
import { addItemToCart, deleteItemFromCart, removeItemFromCart } from "../../store/cart.slice";
import styles from "./CartItem.module.css";
import { CartItemProps } from "./CartItem.props";

export const CartItem: FC<CartItemProps> = (props) => {
  const dispatch = useDispatch();

  const increase = (event: MouseEvent) => {
    event?.preventDefault();
    dispatch(addItemToCart(props.id));
  };

  const decrease = (event: MouseEvent) => {
    event?.preventDefault();
    dispatch(deleteItemFromCart(props.id));
  };

  const remove = (event: MouseEvent) => {
    event?.preventDefault();
    dispatch(removeItemFromCart(props.id));
  };

  return (

    <div className={styles.item}>
      <div className={styles.image} style={{ backgroundImage: `url(${props.image})` }}></div>
      <div className={styles.description}>
        <div className={styles.name}>{props.name}</div>
        <div className={styles.currency}>{props.price}&nbsp;₽</div>
      </div>
      <div className={styles.actions}>
        <button className={styles.minus} onClick={decrease}>
          <img src="/minus-icon.svg" alt="Удалить из корзины" />
        </button>
        <div className={styles.number}>{props.count}</div>
        <button className={styles.plus} onClick={increase}>
          <img src="/plus-icon.svg" alt="Добавить в корзину" />
        </button>
        <button className={styles.remove} onClick={remove}>
          <img src="/delete-icon.svg" alt="Удалить все" />
        </button>
      </div>

      <div className={styles.rating}>
        {props.rating}
        <img src="/star-icon.svg" alt="Иконка звезды" />
      </div>


    </div>

  );
};