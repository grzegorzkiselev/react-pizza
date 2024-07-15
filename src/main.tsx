import axios from "axios";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { PREFIX } from "./helpers/Api";
import { RequireAuth } from "./helpers/RequireAuth";
import "./index.css";
import { IProduct } from "./interfaces/product.interface";
import { AuthLayout } from "./layout/Auth/AuthLayout";
import { Layout } from "./layout/Menu/Layout";
import { Cart } from "./pages/Cart/Cart";
import { Error } from "./pages/Error/Error";
import { Login } from "./pages/Login/Login";
import { Product } from "./pages/Product/Product";
import { Register } from "./pages/Register/Register";
import { Success } from "./pages/Success/Success";
import { store } from "./store/store";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth><Layout /></RequireAuth>,
    children: [
      {
        path: "/",
        element: <Suspense fallback={<p>Загрузка</p>}>
          <Menu />
        </Suspense>
      },
      {
        path: "/success",
        element: <Success />
      },
      {
        path: "/cart",
        element: <Cart />
      },
      {
        path: "product/:id",
        element: <Product />,
        errorElement: <Error />,
        loader: async ({ params }) => {
          return defer({
            data: await axios.get<IProduct>(`${PREFIX}products/${params.id}`)
          });

          // const { data } = await axios.get<IProduct>(`${PREFIX}produоооcts/${params.id}`);
          // return data;
        }
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
    ]
  },
  {
    path: "*",
    element: <Error />
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);