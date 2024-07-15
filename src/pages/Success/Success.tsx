import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./Success.module.css";

export const Success = () => {
  const navigate = useNavigate();

  return <div className={styles.success}>
    <img src="/pizza.png" alt="Пицца" />
    <div className={styles.text}>Ваш заказ успешно оформлен!</div>
    <Button appearance="big" onClick={() => navigate("/", { replace: true })}>Сделать новый заказ</Button>
  </div>;
};