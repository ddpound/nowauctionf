import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

const ProductBox = ({ roomNum, productList }) => {
  console.log(productList);
  let product = productList[productList.length - 1];
  console.log(product);
  return (
    <div>
      {!!productList && productList.length > 0 && (
        <div key={product.id}>{product.name}</div>
      )}
    </div>
  );
};

export default ProductBox;
