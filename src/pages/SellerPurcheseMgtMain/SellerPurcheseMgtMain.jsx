import axios from "axios";
import { React, useState, useEffect, useRef, Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import {
  requestGetHaveToken,
  requestPostHaveToken,
} from "../../commonFuntions/requestHaveToken";

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

  const changeRequestStatus = (productReservation, statusNum) => {
    // 백엔드 -> 없음,판매완료,취소,보류 (0,1,2,3)
    const requestPostStatus = requestPostHaveToken(
      "/auction-seller/seller/change-reservation/" + statusNum,
      props,
      productReservation
    ).then((res) => {
      console.log(res);
      document.location.reload();
    });
  };

  return (
    <div className="container">
      <div className="d-flex mt-3 mb-3">
        <div className="float-end w-50">
          <h1>판매자 구매 관리 페이지</h1>
        </div>
        <div className="float-end w-50">
          <button className="btn btn-dark">판매완료통</button>
          <button className="btn btn-dark">휴지통</button>
        </div>
      </div>
      <div>
        <div className="d-flex">
          <input className="rounded-3 w-50" type="text" />
          <select
            className="form-select w-25"
            defaultValue={0}
            aria-label="Default select example"
          >
            <option value={0}>선택안함</option>
            <option value={1}>판매제품</option>
            <option value={2}>구매자</option>
            <option value={3}>구매날짜</option>
            <option value={4}>상태</option>
          </select>
          <button className="btn btn-dark">검색</button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">판매제품(링크)</th>
            <th scope="col">구매자</th>
            <th scope="col">수량</th>
            <th scope="col">구매날짜</th>
            <th scope="col">처리</th>
            <th scope="col">상태</th>
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
                      className="btn btn-dark me-2"
                      onClick={() => {
                        changeRequestStatus(productReservation, 1);
                      }}
                    >
                      판매완료
                    </button>
                    <button
                      id={productReservation.id}
                      className="btn btn-dark me-2"
                      onClick={() => {
                        changeRequestStatus(productReservation, 3);
                      }}
                    >
                      보류
                    </button>
                    <button
                      id={productReservation.id}
                      className="btn btn-dark me-2"
                      onClick={() => {
                        changeRequestStatus(productReservation, 2);
                      }}
                    >
                      취소
                    </button>
                    <button
                      id={productReservation.id}
                      className="btn btn-danger me-2"
                    >
                      삭제
                    </button>
                  </td>
                  <td>{productReservation.reservationStatus}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default SellerPurcheseMgtMain;
