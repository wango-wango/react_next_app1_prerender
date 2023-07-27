import fs from "fs/promises";
import path from "path";

import React, { Fragment } from "react";
import { useRouter } from "next/router";

function ProductDetail(props) {
  // 這裡是正常在 client component 取得 dynamic router 的方式
  const router = useRouter();
  const productId = router.query.pid;

  return (
    <Fragment>
      <h1>ProductDetail</h1>
      <p>client component get dynamic router params - {productId}</p>
      <p>server component get dynamic router params - {props.productId}</p>
      <h3>DESCRIPTION</h3>
      <p>{props.product.id}</p>
      <p>{props.product.title}</p>
      <p>{props.product.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // 這裡是 server component 取得 dynamic router 的方式
  const { params } = context;
  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);
  return {
    props: {
      productId,
      product,
    },
    revalidate: 60,
  };
}

export default ProductDetail;
