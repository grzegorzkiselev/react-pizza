import axios, { AxiosError } from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Heading } from "../../components/Headling/Heading";
import { Search } from "../../components/Search/Search";
import { PREFIX } from "../../helpers/Api";
import { IProduct } from "../../interfaces/product.interface";
import styles from "./Menu.module.css";
import { MenuList } from "./MenuList/MenuList";

const Menu = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>("");
  const [filter, setFilter] = useState("");

  const getMenu = async (name?: string) => {
    try {
      // const res = await fetch(`${PREFIX}products`);
      // if (!res.ok) {
      //   return;
      // }
      // const data = await res.json() as Product[];
      // setProducts(data);

      // await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve();
      //   }, 2000);
      // });
      setIsLoading(true);
      const { data } = await axios.get<IProduct[]>(`${PREFIX}products`, { params: { name } });
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError) {
        setError(error.message);
        return;
      }
    }
  };

  // useEffect(() => {
  //   getMenu();
  // }, []);

  const updateFilter = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    getMenu(filter);
  }, [filter]);

  return (
    <>
      <div className={styles.head}>
        <Heading>Меню</Heading>
        <Search onChange={updateFilter} />
      </div>
      <div>
        {error && <p>{error}</p>}
        {!isLoading
          ? products.length > 0 ? <MenuList products={products} /> : <p>Продукты не найдены</p>
          : <p>Загружаем продукты...</p>
        }
      </div>
    </>
  );
};

export default Menu;