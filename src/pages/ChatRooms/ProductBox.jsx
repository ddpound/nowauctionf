import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

const ProductBox = ({ roomNum, productList, userdata, props }) => {
  console.log(productList);
  let product = productList[productList.length - 1];
  console.log(product);

  const [order, setOrder] = useState({
    seller: 0,
    buyer: 0,
    price: 0,
    productModel: {
      name: "",
      price: 0,
      seller: 0,
      quantity: 1,
      auction: false,
    },
    quantity: 0,
  });

  const saveOrder = () => {
    requestPostHaveToken("/auction-chat/user/order/save", props, order).then(
      (res) => {
        console.log(res);
      }
    );
  };

  useEffect(() => {
    if (!!product) {
      setOrder({
        seller: product.seller,
        quantity: product.quantity,
        productModel: product,
        buyer: userdata.id,
      });
    }
  }, [product]);

  console.log(order);

  return (
    <div>
      {!!productList && productList.length > 0 && (
        <div key={product.id}>
          <p>이름 : {product.name}</p>
          <p>가격 : {product.price}</p>
          <button onClick={saveOrder} className="btn btn-dark">
            구매하기
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductBox;
