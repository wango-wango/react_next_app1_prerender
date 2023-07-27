import React from "react";

// 在這裡引入 node.js 的內容 不會被 render 到 client 端
import fs from "fs/promises";
import path from "path";

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// pre render before HomePage
// 這裡的內容都不會 render 到 client 端
export async function getStaticProps() {
  console.log("re-gerationg...");
  // path.join() 將後面的字串組成一個規範化的路徑字串
  // process.cwd() 為 node 執行的當前路徑，在這邊為根目錄
  const filePath = path.join(process.cwd(), "data", "dummy-data.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    // redirct 導向到其他頁面
    return {
      redirct: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length == 0) {
    // notFound: true 會進入 404 not found page
    return { notFound: true };
  }
  return {
    props: {
      products: data.products,
    },
    revalidate: 60,
  };
}
export default HomePage;
