import { FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Heading } from "../../components/Headling/Heading";
import { Input } from "../../components/Input/Input";
import { AppDispatch, RootState } from "../../store/store";
import { login, userActions } from "../../store/user.slice";
import styles from "./Login.module.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { jwt, loginErrorMessage } = useSelector((state: RootState) => (state.user));

  useEffect(() => {
    if (jwt) {
      navigate("/");
    }
  }, [jwt, navigate]);

  const sendLogin = async (email: string, password: string) => {
    dispatch(login({ email, password }));

    // try {
    //   const { data } = await axios.post<LoginResponse>(`${PREFIX}auth/login`, {
    //     email,
    //     password
    //   });

    //   // localStorage.setItem("jwt", JSON.stringify(data.access_token));
    //   dispatch(userActions.addJwt(data.access_token));

    //   navigate("/", { replace: true });
    // } catch (error) {
    //   if (error instanceof AxiosError) {
    //     console.error(error.message);
    //     setError(error.response?.data.message);
    //   }
    // }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(userActions.cleanLoginError());
    const target = event.target as typeof event.target & { [key: string]: { value: string } };
    const { email, password } = target;

    sendLogin(email.value, password.value);
  };

  return <div className={styles.login}>
    <Heading>Вход</Heading>
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.login}>
        <label htmlFor="email">Ваш Email</label>
        <Input id="email" name="email" type="email" placeholder="Email" required />
      </div>
      <div className={styles.login}>
        <label htmlFor="password">Пароль</label>
        <Input id="password" name="password" type="password" placeholder="Пароль" required />
      </div>
      {loginErrorMessage && <p>{loginErrorMessage}</p>}
      <Button appearance="big">Вход</Button>
      <div className={styles.links}>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </form>
  </div>;
};