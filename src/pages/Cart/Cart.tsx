import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { CartItem } from "../../components/CartItem/CartItem";
import { Heading } from "../../components/Headling/Heading";
import { PREFIX } from "../../helpers/Api";
import { RootState } from "../../store/store";
import styles from "./Cart.module.css";
import { clearCart } from "../../store/cart.slice";

export const Cart = () => {
  const [cartProducts, setCartProducts] = useState();
  const items = useSelector((state: RootState) => state.cart.items);
  const jwt = useSelector((store: RootState) => store.user.jwt);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cartProducts && items.reduce((cartPrice, item) => {
    const product = cartProducts.find((p) => p.id === item.id);
    if (!product) {
      return cartPrice;
    }
    return cartPrice + (product.price * item.count);
  }, 0);

  const getItem = async (id: number) => {
    const { data } = await axios.get(`${PREFIX}products/${Number(id)}`);
    return data;
  };

  const loadAllItems = async () => {
    const res = await Promise.all(items.map((item) => getItem(item.id)));
    setCartProducts(res);
  };

  useEffect(() => {
    loadAllItems();
  }, [items]);

  const checkout = async () => {
    const { data } = await axios.post(`${PREFIX}order`, {
      products: items
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    dispatch(clearCart());
    navigate("/success", { replace: true });
  };

  return (
    <>
      <Heading className={styles.heading}>Корзина</Heading>
      {cartProducts &&
        items.reduce((cart, item) => {
          const product = cartProducts.find((p) => p.id === item.id);
          if (!product) {
            return cart;
          }
          cart.push(<CartItem key={product.id} count={item.count} {...product} />);
          return cart;
        }, [])}
      <div className={styles.line}>
        <div className={styles.text}>Итог</div>
        <div className={styles.price}>{total}</div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.line}>
        <div className={styles.text}>Доставка</div>
        <div className={styles.price}>169</div>
      </div>
      <hr className={styles.hr} />
      <div className={styles.line}>
        <div className={styles.text}>Итог</div>
        <div className={styles.price}>{total + 169}</div>
      </div>
      <Button onClick={checkout} className={styles.checkout} appearance="big">Оформить</Button>
    </>
  );
};
