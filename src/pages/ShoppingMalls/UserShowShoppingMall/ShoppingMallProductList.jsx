import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

import ShoppingMallProductComponent from "./ShoppingMallProductComponent";

export default function ShoppingMallProductList({
  props,
  onePagePostNumber,
  mallId,
}) {
  const [productList, setProductList] = useState([]);
  const [postingNumber, setPostingNumber] = useState(onePagePostNumber);
  const [page, setPage] = useState(1);

  // 페이지 네이션
  const offset = (page - 1) * postingNumber;

  useEffect(() => {
    // 무조건 딱 한번 리스트를 받아와서 페이징해줌
    const requestList = axios.get(
      "/show-shoppingmall/find-product-all/" + mallId
    );
    requestList.then((res) => {
      setProductList(res.data.reverse());
    });
  }, []);

  console.log(productList);

  return (
    !!productList && (
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {productList.map((productList) => {
            return (
              <ShoppingMallProductComponent
                key={productList.id}
                name={productList.productName}
                seller={productList.shoppingMall.userModel.nickname}
                price={productList.productPrice}
                quantity={productList.productQuantity}
              />
            );
          })}
          ;
        </div>
      </div>
    )
  );
}
