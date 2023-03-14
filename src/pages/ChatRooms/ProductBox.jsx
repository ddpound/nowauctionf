import "./ChatRoom.scss";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

const ProductBox = ({ roomNum, productList, userdata, props }) => {
  // 마지막 제품만 보여줌
  let product = productList[productList.length - 1];

  const [order, setOrder] = useState({
    seller: 0,
    buyer: 0,
    productModel: {
      name: "",
      price: 0,
      seller: 0,
      quantity: 1,
      auction: false,
    },
    quantity: 0,
  });

  const raisePriceProduct = () => {
    requestPostHaveToken("/auction-chat/user/order/raise", props, {
      product: product,
      raisePrice: 0,
    }).then((res) => {
      console.log(res);
    });
  };

  const saveOrder = () => {
    requestPostHaveToken("/auction-chat/user/order/save", props, order).then(
      (res) => {
        console.log(res);
      }
    );
  };

  useEffect(() => {
    if (!!product && !!userdata) {
      setOrder({
        seller: product.seller,
        quantity: product.quantity,
        productModel: product,
        buyer: userdata.id,
        auction: product.auction,
      });
    }
  }, [product]);

  return (
    <div>
      {!!productList && productList.length > 0 && (
        <div key={product.id}>
          <p>이름 : {product.name}</p>
          {!product.auction && <p> 가격 : {product.price}</p>}
          {product.auction && <p> 최고가 : {product.price}</p>}
          {product.auction && <p> 최고 입찰자 : {product.price}</p>}
          <p>
            <label htmlFor="input-quantity">수량 : </label>
            <input
              id="input-quantity"
              type="number"
              style={{ marginLeft: "10px;" }}
            />
          </p>
          {product.auction && (
            <div>
              <label htmlFor="input-raise-price">입찰가 : </label>
              <input
                id="input-raise-price"
                type="number"
                style={{ marginLeft: "10px;" }}
              />
              <button className="btn btn-dark">입찰</button>
            </div>
          )}
          <button onClick={saveOrder} className="btn btn-dark">
            구매하기
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductBox;
