import axios from "axios";
import { React, useState, useEffect, useRef, Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import { requestGetHaveToken } from "../../commonFuntions/requestHaveToken";

/**
 * 판매자가 구매 예약들의 관리를 해주는
 * 메인 페이지
 * 이름 뜻은 판매자 구매 관리 페이지 (SellerPucheseManegementMain)
 *
 * 검색 (아이디, 키워드{특정단어 검색})
 * 정렬 (가장 최신순, 오래된순, 수량 가장 많은순, 수량 적은순,)
 *
 * @returns 판매자의 구매 관리페이지 리턴
 */
const SellerPurcheseMgtMain = (props) => {
  const shoppingMallId = props.match.params.id;
  const [productReservationList, setProductReservationList] = useState([]);

  useEffect(() => {
    const requestGetProductList = requestGetHaveToken(
      "/auction-seller/seller/find-all-reservation/" + shoppingMallId,
      props
    ).then((res) => {
      console.log(res);
      setProductReservationList(res.data);
    });
  }, []);
  return (
    <div className="container">
      <div>판매자 구매 관리 페이지</div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">판매제품(링크)</th>
            <th scope="col">구매자</th>
            <th scope="col">수량</th>
            <th scope="col">구매날짜</th>
            <th scope="col">처리</th>
          </tr>
        </thead>
        <tbody>
          {setProductReservationList.length > 0 &&
            productReservationList.map((productReservation) => {
              return (
                <tr key={productReservation.id}>
                  <th scope="row">{productReservation.id}</th>
                  <td>{productReservation.productId.productName}</td>
                  <td>{productReservation.buyerNickName}</td>
                  <td>{productReservation.quantity}</td>
                  <td>{productReservation.createDate}</td>
                  <td>
                    <button
                      id={productReservation.id}
                      className="btn btn-danger"
                    >
                      삭제
                    </button>
                    <button id={productReservation.id} className="btn btn-dark">
                      배송완료
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPurcheseMgtMain;
