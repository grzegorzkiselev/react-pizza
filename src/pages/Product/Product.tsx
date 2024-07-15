import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import { IProduct } from "../../interfaces/product.interface";

export const Product = () => {
  // const { id } = useParams();
  const data = useLoaderData() as { data: IProduct };

  return (
    <Suspense fallback="<p>Загружаюсь...</p>">
      <Await
        resolve={data.data}
      >
        {({ data }) => (
          <p>Product — {data.name}</p>
        )}
      </Await>
    </Suspense>
  );
};
