import axios from "axios";
import { React, useState, useEffect, useRef } from "react";
import "bootstrap/dist/js/bootstrap.bundle";

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

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios.get("/show-shoppingmall/product-show/" + productId).then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  }, []);

  return <div className="container">{product.content}</div>;
}
