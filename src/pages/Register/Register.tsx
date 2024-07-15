import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Headling/Heading";
import { Input } from "../../components/Input/Input";
import { AppDispatch, RootState } from "../../store/store";
import { register, userActions } from "../../store/user.slice";
import styles from "../Login/Login.module.css";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, registerErrorMessage } = useSelector((state: RootState) => (state.user));

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(userActions.cleanRegisterError());
    const target = event.target as typeof event.target & { [key: string]: { value: string } };
    const { email, name, password } = target;

    dispatch(register({ email: email.value, name: name.value, password: password.value }));
  };

  return <div className={styles.login}>
    <Heading>Регистрация</Heading>
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.login}>
        <label htmlFor="email">Ваш Email</label>
        <Input id="email" name="email" type="email" placeholder="Email" required />
      </div>
      <div className={styles.login}>
        <label htmlFor="name">Ваше имя</label>
        <Input id="name" name="name" type="text" placeholder="Ваше имя" required />
      </div>
      <div className={styles.login}>
        <label htmlFor="password">Пароль</label>
        <Input id="password" name="password" type="password" placeholder="Пароль" required />
      </div>
      {registerErrorMessage && <p>{registerErrorMessage}</p>}
      <Button appearance="big">Зарегистрироваться</Button>
      <div className={styles.links}>
        <div>Есть аккаунт?</div>
        <Link to="/auth/register">Войти</Link>
      </div>
    </form>
  </div>;
};