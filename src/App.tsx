import { Link } from "react-router-dom";
import { Button } from "./components/Button/Button";
import { Input } from "./components/Input/Input";

export const App = () => {

  return (
    <>
      <Button>маленькая</Button>
      <Input placeholder="Email" />
      <nav>
        <Link to="/">Меню</Link>
        <Link to="/cart">Корзина</Link>
      </nav>
    </>
  );
};
