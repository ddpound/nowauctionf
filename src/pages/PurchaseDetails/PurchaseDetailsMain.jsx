import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";
import "./PurchaseDetailsMain.scss";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

import { returnDATA, DataNames } from "../../commonFuntions/CommonEncryption";

const PurchaseDetailsMain = () => {
  const dn = new DataNames();

  // 유저데이터가 있는지 체크
  const userdata = returnDATA(dn.getLocalUserDataName());

  const [liveOrderList, setLiveOrderList] = useState([]);

  const [reservationList, setReservationList] = useState([]);

  useEffect(() => {
    if (!!userdata) {
      requestGetHaveToken(
        "/auction-seller/user/find-my-reservation/" + userdata.id
      ).then((res) => {
        console.log(res);
        setReservationList(res.data);
      });

      requestGetHaveToken(
        "/auction-chat/user/order/find-my-order/" + userdata.id
      )
        .then((res) => {
          console.log(res);
          setLiveOrderList(res.data);
        })
        .catch((error) => {
          console.log("에러발생");
          console.log(error);
        });
    }
  }, []);

  console.log(reservationList);

  return (
    <div className="container">
      구매내역 메인 페이지
      <h3>쇼핑몰 구매 예약 내역</h3>
      {reservationList.length > 0 ? (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">제품이름</th>
                <th scope="col">구매가격</th>
                <th scope="col">구매개수</th>
                <th scope="col">상태</th>
              </tr>
            </thead>
            {reservationList.map((list) => {
              return (
                <tbody key={list.id}>
                  <tr>
                    <th scope="row">1</th>
                    <td>{list.productId.productName}</td>
                    <td>{list.productId.productPrice}</td>
                    <td>{list.quantity}</td>
                    <td>{list.reservationStatus}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        <div>
          <h3>구매 내역이 없습니다.</h3>
        </div>
      )}
      <h3>실시간 구매 예약 내역</h3>
      {liveOrderList.length > 0 ? (
        <div className="real-time-purchase">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">제품이름</th>
                <th scope="col">구매가격</th>
                <th scope="col">구매개수</th>
              </tr>
            </thead>
            {liveOrderList.map((data) => {
              return (
                <tbody key={data.id}>
                  <tr>
                    <th scope="row">1</th>
                    <td>{data.body.productModel.name}</td>
                    <td>{data.body.productModel.price}</td>
                    <td>{data.body.quantity}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      ) : (
        <div>
          <h3>구매 내역이 없습니다.</h3>
        </div>
      )}
      <div>페이지 네이션 버튼</div>
    </div>
  );
};

export default PurchaseDetailsMain;
