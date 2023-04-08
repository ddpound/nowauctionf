import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";
import "./PurchaseDetailsMain.scss";

import {
  requestPostHaveToken,
  requestGetHaveToken,
  requestDeleteHaveToken,
} from "../../commonFuntions/requestHaveToken";

const PurchaseDetailsMain = () => {
  // 유저데이터가 있는지 체크
  const userdata = JSON.parse(localStorage.getItem("userdata"));

  useEffect(() => {
    if (!!userdata) {
      requestGetHaveToken(
        "/auction-chat/user/order/find-my-order/" + userdata.id
      ).then((res) => {
        console.log(res);
      });
    }
  }, []);

  return (
    <div className="container">
      구매내역 메인 페이지
      <div>구매내역 List</div>
      <div>페이지 네이션 버튼</div>
    </div>
  );
};

export default PurchaseDetailsMain;
