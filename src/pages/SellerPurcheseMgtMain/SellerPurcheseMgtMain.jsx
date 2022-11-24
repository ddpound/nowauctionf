import axios from "axios";
import { React, useState, useEffect, useRef, Fragment } from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import { requestGetHaveToken } from "../../commonFuntions/requestHaveToken";

/**
 * 판매자가 구매 예약들의 관리를 해주는
 * 메인 페이지
 * 이름 뜻은 판매자 구매 관리 페이지 (SellerPucheseManegementMain)
 * @returns 판매자의 구매 관리페이지 리턴
 */
const SellerPurcheseMgtMain = () => {
  return (
    <div className="container">
      <div>판매자 구매 관리 페이지</div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">판매제품(링크)</th>
            <th scope="col">구매자</th>
            <th scope="col">구매날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td colspan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SellerPurcheseMgtMain;
