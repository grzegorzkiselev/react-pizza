import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { highlightElement } from "../../helpers/Classnames";
import { AppDispatch, RootState } from "../../store/store";
import { getProfile, userActions } from "../../store/user.slice";
import styles from "./Layout.module.css";

export const Layout = () => {
  const items = useSelector((state: RootState) => state.cart.items);
  // const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { email, name, getProfileErrorMessage } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const logout = () => {
    try {
      // localStorage.removeItem("jwt");
      dispatch(userActions.logout());
      navigate("auth/login", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={styles.user}>
          <img src="/avatar.png" alt="Аватарка пользователя" />
          {getProfileErrorMessage
            ? <p>{getProfileErrorMessage}</p>
            : <>
              <div className={styles.name}>{name}</div>
              <div className={styles.email}>{email}</div>
            </>
          }
        </div>
        <div className={styles.menu}>
          <NavLink to="/" className={
            ({ isActive }) => highlightElement({ className: styles.link, isHighlighted: isActive, hightLightedClass: styles.active })
          } >
            <img src="/menu-icon.svg" alt="Иконка меню" />
            <span>Меню</span>
          </NavLink>
          <NavLink to="/cart" className={
            ({ isActive }) => highlightElement({ className: styles.link, isHighlighted: isActive, hightLightedClass: styles.active })
          } >
            <img src="/cart-icon.svg" alt="Иконка корзины" />
            <span>Корзина</span><span className={styles["cart-count"]}>{items.reduce((sum, item) => (sum + item.count), 0)}</span>
          </NavLink>
        </div>
        <Button className={styles.exit} onClick={logout}>
          <img src="/exit-icon.svg" alt="Кнопка выхода" />
          <span>Выход</span>
        </Button>
      </div>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div >
  );
};
