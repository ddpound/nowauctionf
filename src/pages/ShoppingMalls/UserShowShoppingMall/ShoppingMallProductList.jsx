import "bootstrap/dist/js/bootstrap.bundle";
import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import { Link, Prompt } from "react-router-dom";

import ShoppingMallProductComponent from "./ShoppingMallProductComponent";

import ListPageNation from "../../../components/PageNation/ListPageNation";

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
      "/auction-seller/auth/show-shoppingmall/find-product-all/" + mallId
    );
    requestList.then((res) => {
      setProductList(res.data.reverse());
    });
  }, []);

  console.log(productList);

  return (
    <div className="container mt-5">
      {!!productList && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {productList
            .slice(offset, offset + postingNumber)
            .map((productList) => {
              return (
                <ShoppingMallProductComponent
                  key={productList.id}
                  productId={productList.id}
                  name={productList.productName}
                  price={productList.productPrice}
                  quantity={productList.productQuantity}
                  thumbnail={productList.pictureUrlPath}
                />
              );
            })}
        </div>
      )}
      {productList.length === 0 && (
        <div className="container mt-5">
          <h3>등록된 제품이 없습니다.</h3>
        </div>
      )}
      {productList.length > 0 && (
        <ListPageNation
          postLength={productList.length}
          oneViewNumber={postingNumber}
          page={page}
          setPage={setPage}
          inMaxPageListNumber={10}
        />
      )}
    </div>
  );
}
