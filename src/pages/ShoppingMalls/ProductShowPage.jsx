import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

import SunEditor from "suneditor-react";
import { Viewer } from "@toast-ui/react-editor";
import {
  requestPostHaveToken,
  requestGetHaveToken,
} from "../../commonFuntions/requestHaveToken";

/**
 * 유저와 관리자등 모두가 볼수있는 제품 뷰 페이지
 *
 */
export default function ProductShowPage(props) {
  const productId = props.match.params.id;

  const [product, setProduct] = useState(...[]);

  useEffect(() => {
    axios.get("/show-shoppingmall/product-show/" + productId).then((res) => {
      setProduct(res.data);
    });
  }, []);

  console.log(product);
  return (
    <div className="container mt-5">
      {!!product && (
        <div className="card mb-3">
          <div className="card-header bg-transparent ">
            <h1 style={{ fontWeight: "bold" }}>{product.productName}</h1>
            <h2>가격 : {product.productPrice}</h2>
            <h2>수량 : {product.productQuantity}</h2>
          </div>

          <div className="card-body text-dark">
            <Viewer initialValue={product.content}></Viewer>
          </div>
          <div className="card-footer bg-transparent">{product.createDate}</div>
        </div>
      )}
    </div>
  );
}
