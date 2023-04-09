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

  // 버튼활성화
  const [disabled, setDisabled] = useState(false);

  const [raisePrice, setRaisePrice] = useState(0);

  const inputChangePrice = (e) => {
    setRaisePrice(e.target.value);
  };

  const [order, setOrder] = useState({
    seller: 0,
    buyer: 0,
    productModel: {
      id: "",
      name: "",
      price: 0,
      seller: 0,
      quantity: 1,
      buyerId: 0,
      auction: false,
    },
    quantity: 0,
  });

  const onChangeQuantity = (e) => {
    setOrder({
      ...order,
      quantity: e.target.value,
    });
  };

  const raisePriceProduct = () => {
    // 버튼이 이미 비활성화되어 있는 경우
    if (disabled) {
      alert("너무빠릅니다! 버튼은 2초간격으로 눌러주세요!");
      return;
    }

    // 버튼을 비활성화하고 2초 후 다시 활성화
    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 2000);

    if (raisePrice <= 0) {
      alert("입찰 가격을 0보다 크게 해주세요");
      return;
    }

    requestPostHaveToken("/auction-chat/user/order/raise", props, {
      product: product,
      raisePrice: raisePrice,
      userdata: userdata,
    }).then((res) => {
      console.log(res);
    });
  };

  const saveOrder = () => {
    if (order.quantity <= 0) {
      alert("수량은 한개 이상 해주세요");
    } else {
      requestPostHaveToken("/auction-chat/user/order/save", props, order).then(
        (res) => {
          setOrder({
            ...order,
            quantity: 0,
          });
          console.log(res);
        }
      );
    }
  };

  useEffect(() => {
    if (!!product && !!userdata) {
      setOrder({
        seller: product.seller,
        quantity: 0,
        productModel: product,
        buyer: userdata.id,
        auction: product.auction,
      });
    }
  }, [product]);

  console.log(product);

  return (
    <div className="product-div">
      {!!productList && productList.length > 0 && (
        <div key={product.id}>
          <p>이름 : {product.name}</p>
          {!product.auction && <p> 가격 : {product.price}</p>}
          {!product.auction && <p> 남은수량 : {product.quantity}</p>}
          {product.auction && <p> 최고가 : {product.price}</p>}
          {product.auction && <p> 최고 입찰자 : {product.finalBuyer}</p>}
          {!product.auction && (
            <p>
              <label htmlFor="input-quantity">구매수량 : </label>
              <input
                id="input-quantity"
                onChange={onChangeQuantity}
                value={order.quantity}
                name="quantity"
                type="number"
              />
              <button onClick={saveOrder} className="btn btn-dark">
                구매하기
              </button>
            </p>
          )}
        </div>
      )}

      {!!product && product.auctionState && (
        <div className="bid-div">
          <label htmlFor="input-raise-price">입찰가 : </label>
          <input
            id="input-raise-price"
            type="number"
            onChange={inputChangePrice}
          />
          <button onClick={raisePriceProduct} className="btn btn-dark">
            입찰
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductBox;
